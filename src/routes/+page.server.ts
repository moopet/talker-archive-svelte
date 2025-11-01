import { promises as fs } from 'fs';
import path from 'path';
import { building } from '$app/environment';

let cachedMtime: Date | null = null;

export async function load() {
  if (building && cachedMtime === null) {
    try {
      const filePath = path.resolve('src/lib/data/talkers.json');
      const stats = await fs.stat(filePath);
      cachedMtime = stats.mtime;
    } catch (e) {
      console.warn('Could not stat talkers.json at build time', e);
      cachedMtime = null;
    }
  }

  return {
    databaseUpdateDate: cachedMtime ? cachedMtime.toISOString() : null
  };
}
