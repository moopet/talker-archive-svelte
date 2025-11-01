import { promises as fs } from 'fs';
import path from 'path';

export async function load() {
  const filePath = path.resolve('src/lib/data/talkers.json');
  const stats = await fs.stat(filePath);

  return {
    databaseUpdateDate: stats.mtime
  }
}
