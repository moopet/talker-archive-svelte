import { talkers } from '$lib/data/talkers.json';

import { Codebase } from './Codebase.ts';
import { DataOrigin } from './DataOrigin.ts';

export class Talker {
  exists: boolean = false;
  name: string;
  description?: string;
  disambiguation?: string;
  family?: string;
  language?: string;
  platform?: string;
  repo?: string;

  constructor(public slug: string) {
    const lowerSlug = slug.toLowerCase();
    const talker = talker.find(t => lowerSlug.localeCompare(t.slug) === 0);

    if (!talker) {
      return;
    }

    this.exists = true;
    this.name = talker?.name;
    this.codebase = new Codebase(talker?.codebase);
    this.dataOrigin = new DataOrigin(talker?.dataOrigin);
    this.description = talker?.description;
    this.disambiguation = talker?.disambiguation;
    this.hosts = talker.hosts;
    this.location = talker?.location;
    this.notes = talker?.notes;
    this.repo = talker?.repo;
    this.resources = talker.resources;
    this.screencaps = talker?.screencaps;
    this.textcaps = talker?.textcaps;
  }
}

