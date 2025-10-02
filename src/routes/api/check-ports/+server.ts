import { json } from '@sveltejs/kit';
import net from 'net';
import { talkers } from '$lib/data/talkers.json';

// Vercel timeout is 10 seconds.
const SOCKET_TIMEOUT = 6000; // ms.

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

const isValidIPv4 = (address: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(address);
}

const isValidPort = (port: number): boolean => {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
};

const isKnownDefunctHost = (hostname: string): boolean => {
  const patterns: RegExp[] = [
    /\.ac\.uk$/,
    /amber\.org\.uk$/,
    /atlantis\.org$/,
    /custard\.org$/,
    /\.edu$/,
    /\.edu\.au$/,
    /ewtoo\.org$/,
    /homeip\.net/,
    /ilserv\.com$/,
    /infomagic\.com$/,
    /mopemansions\.org/,
    /mytalker\.org$/,
    /no-ip\.org/,
    /offswn\.net$/,
    /spod\.org$/,
    /talker\.com$/,
    /talkernet\.net$/,
    /talkerhost\.com$/,
    /talkers\.org$/,
    /talkers\.ws$/,
    /temple2k\.org/,
    /themanor\.org$/,
    /tirsek\.com$/,
    /yuss\.org$/,
  ];

  return patterns.some(pattern => pattern.test(hostname));
};

const getAllPotentialHosts = (letter: string): Host[] => {
  return talkers
    .filter(talker => talker?.hosts?.length > 0)
    .map(talker => ({
      ...talker,
      hosts: talker.hosts.map(host => ({
        ...host,
        name: talker.name

      }))
    }))
    .flatMap((talker: InputObject) => talker.hosts)
    .filter(host => !host?.blocked)
    .filter(host => host?.hostname && host?.port)
    .filter(host => host.name.toLowerCase().replace(/^the /, '').startsWith(letter))
    .filter(host => !isValidIPv4(host.hostname))
    .filter(host => !isKnownDefunctHost(host.hostname))
    .sort((a, b) => a.name.replace(/^the /i, '').localeCompare(b.name.replace(/^the /i, '')));
};

export async function GET({url}) {
  const letter = (url.searchParams.get('letter') ?? 'a').slice(0, 1).toLowerCase();
  const potentialHosts = getAllPotentialHosts(letter);

  const results: CheckPortResult[] = await Promise.all(
    potentialHosts.map(async ({ name, hostname, port }) => {
      try {
        return new Promise<CheckPortResult>((resolve) => {
          const socket = new net.Socket();

          socket.setTimeout(SOCKET_TIMEOUT);

          socket.on('connect', () => {
            socket.destroy();
            console.log({status: "up", name, hostname, port});
            resolve({ name, hostname, port, isConnectable: true });
          });

          socket.on('timeout', () => {
            socket.destroy();
            //console.log({status: "down", name, hostname, port});
            resolve({ name, hostname, port, isConnectable: false, error: 'Connection timed out' });
          });

          socket.on('error', (err) => {
            socket.destroy();
            //console.log({status: "down", name, hostname, port});
            resolve({ name, hostname, port, isConnectable: false, error: err.message });
          });

          socket.connect(port, hostname);
        });
      } catch (err) {
        //console.log({status: "down", name, hostname, port});
        return { name, hostname, port, isConnectable: false, error: `Failed: ${err.message}` };
      }
    })
  );

  return json(results, { status: 200 });
}
