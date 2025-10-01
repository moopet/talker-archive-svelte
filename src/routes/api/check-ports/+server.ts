import { json } from '@sveltejs/kit';
import net from 'net';
import { talkers } from '$lib/data/talkers.json';

const SOCKET_TIMEOUT = 10000; // ms.

interface Host {
  hostname: string;
  port: number;
}

interface InputObject {
  hosts: Host[];
}

interface CheckPortResult {
  name: string;
  hostname: string;
  port: number;
  isConnectable: boolean;
  error?: string;
}

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
    .flatMap((talker: InputObject) => talker.hosts)
    .sort((a, b) => a.name.localeCompare(b.name));

  const results: CheckPortResult[] = await Promise.all(
    allHosts.map(async ({ name, hostname, port }) => {
      try {
        if (!hostname || typeof hostname !== 'string') {
          return { name, hostname: hostname || 'unknown', port, isConnectable: false, error: 'Invalid or missing hostname' };
        }

        if (!isValidPort(port)) {
          return { hostname, port, isConnectable: false, error: 'Invalid or missing port' };
        }

        return new Promise<CheckPortResult>((resolve) => {
          const socket = new net.Socket();

          socket.setTimeout(SOCKET_TIMEOUT);

          socket.on('connect', () => {
            socket.destroy();
            resolve({ name, hostname, port, isConnectable: true });
          });

          socket.on('timeout', () => {
            socket.destroy();
            resolve({ name, hostname, port, isConnectable: false, error: 'Connection timed out' });
          });

          socket.on('error', (err) => {
            socket.destroy();
            resolve({ name, hostname, port, isConnectable: false, error: err.message });
          });

          socket.connect(port, hostname);
        });
      } catch (err) {
        return { name, hostname, port, isConnectable: false, error: `Failed: ${err.message}` };
      }
    })
  );

  return json(results, { status: 200 });
}
