import { writeFile } from 'fs/promises';
import net from 'net';
import { join } from 'path';
import talkersData from './src/lib/data/talkers.json' with { type: 'json' };
import type { Talker } from './src/lib/types';

// Timeouts are in seconds. Talkers can be slow :)
const SOCKET_TIMEOUT = 5 * 1000;
const OVERALL_TIMEOUT = 5 * 60 * 1000;
const CONCURRENCY_LIMIT = 2;

interface DataObject {
  [key: string]: any;
}

interface PotentialHost {
  name: string;
  hostname: string;
  port: number;
}

interface InputObject {
  hosts: PotentialHost[];
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

const getAllPotentialHosts = (): PotentialHost[] => {
  const allTalkers = talkersData.talkers as Talker[];

  return talkersData.talkers
    .filter(talker => talker.hosts && talker.hosts?.length > 0)
    .map(talker => ({
      ...talker,
      hosts: talker!.hosts!.map(host => ({
        ...host,
        name: talker.name
      }))
    }))
    .flatMap((talker: Talker) => talker.hosts)
    .filter(host => !host?.blocked)
    .filter(host => host?.hostname && host?.port)
     /*
      * Don't bother trying bare IP addresses.
      * if it doesn't have a hostname, it's lost to time.
      */
    .filter(host => !isValidIPv4(host!.hostname));
};

const checkConnection = async ({ name, hostname, port }: PotentialHost) => {
  try {
    const socketResult = await new Promise<CheckPortResult>((resolve) => {
      const socket = new net.Socket();

      /*
       * socket.setTimeout does not work for some reason.
       * It works using a simple node test script, but under bun it
       * never fires the event :/
       * This is a hack to do the same thing.
       */
      const socketTimeoutId = setTimeout(() => {
          socket.destroy();
          resolve({ name, hostname, port, isConnectable: false, error: 'Connection timed out' });
          }, SOCKET_TIMEOUT);

      socket.on('connect', () => {
        clearTimeout(socketTimeoutId);
        socket.destroy();
        resolve({ name, hostname, port, isConnectable: true });
      });

      socket.on('error', (err) => {
        clearTimeout(socketTimeoutId);
        socket.destroy();
        resolve({ name, hostname, port, isConnectable: false, error: err.message });
      });

      socket.connect(port, hostname);
    });

    return socketResult;
  } catch (err: any) {
    return { name, hostname, port, isConnectable: false, error: `Failed: ${err.message}` };
  }
};

/**
 * Batch the connection requests so this can run the whole database on
 * even a little rPi or something with limited resources.
 */
async function batchAsync<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  const queue = [...items];

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();

      if (item) {

        results.push(await fn(item));
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);

  return results;
}

async function writeJsonToFile(data: DataObject, fileName: string): Promise<void> {
    const filePath = join(process.cwd(), 'static', fileName);
    const jsonString = JSON.stringify(data, null, 2);
    await writeFile(filePath, jsonString, 'utf8');
}

async function cron() {
  const overallTimeout = setTimeout(() => {
    console.error('Overall timeout exceeded, exiting');
    process.exit(1);
  }, OVERALL_TIMEOUT);

  try {
    const potentialHosts = getAllPotentialHosts();

    const results: CheckPortResult[] = await batchAsync(
      potentialHosts,
      CONCURRENCY_LIMIT,
      checkConnection
    );

    await writeJsonToFile({
      dateChecked: new Date().toISOString(),
      talkers: results.filter(result => result.isConnectable)
    }, "status.json");

    clearTimeout(overallTimeout);
  } catch (error) {
    clearTimeout(overallTimeout);
    console.error('Cron failed:', error);
    process.exit(1);
  }
}

cron();
