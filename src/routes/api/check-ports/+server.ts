import { json } from '@sveltejs/kit';
import net from 'net';
import { promises as dns } from 'dns';
import { talkers } from '$lib/data/talkers.json';

const SOCKET_TIMEOUT = 3000; // ms.

interface Host {
  hostname: string;
  port: number;
}

interface InputObject {
  hosts: Host[];
}

interface CheckPortResult {
  hostname: string;
  ip?: string;
  port: number;
  isConnectable: boolean;
  error?: string;
}

const isIPv4 = (hostname: string): boolean => {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) && hostname.split('.').every(num => parseInt(num) <= 255);
};

const isValidPort = (port: number): boolean => {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
};

export async function GET() {
  if (!Array.isArray(talkers)) {
    return json({ error: 'Invalid talkers.json: must be a non-empty array of objects with hosts array' }, { status: 500 });
  }

  const allHosts = talkers
    .filter(talker => talker?.hosts?.length > 0)
    // .slice(0, 30)
    .map(talker => ({
      ...talker,
      hosts: talker.hosts.map(host => ({
        ...host,
        name: talker.name

      }))
    }))
    .flatMap((talker: InputObject) => talker.hosts);

  const results: CheckPortResult[] = await Promise.all(
    allHosts.map(async ({ name, hostname, port }) => {
      if (!hostname || typeof hostname !== 'string') {
        return { name, hostname: hostname || 'unknown', port, isConnectable: false, error: 'Invalid or missing hostname' };
      }

      if (!isValidPort(port)) {
        return { hostname, port, isConnectable: false, error: 'Invalid or missing port' };
      }

      try {
        let ip: string;

        if (isIPv4(hostname)) {
          ip = hostname;
        }
        else {
          const addresses = await dns.resolve4(hostname);
          ip = addresses[0];
        }

        if (!ip) {
          return { name, hostname, port, isConnectable: false, error: 'No IP address resolved' };
        }

        return new Promise<CheckPortResult>((resolve) => {
          const socket = new net.Socket();

          socket.setTimeout(SOCKET_TIMEOUT);

          socket.on('connect', () => {
            socket.destroy();
            resolve({ name, hostname, ip, port, isConnectable: true });
          });

          socket.on('timeout', () => {
            socket.destroy();
            resolve({ name, hostname, ip, port, isConnectable: false, error: 'Connection timed out' });
          });

          socket.on('error', (err) => {
            socket.destroy();
            resolve({ name, hostname, ip, port, isConnectable: false, error: err.message });
          });

          socket.connect(port, ip);
        });
      } catch (err) {
        return { name, hostname, port, isConnectable: false, error: `Failed: ${err.message}` };
      }
    })
  );

  return json(results, { status: 200 });
}
