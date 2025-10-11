import { codebases } from '$lib/data/talkers.json';

export class Codebase {
  exists: boolean = false;
  name: string;
  description?: string;
  family?: string;
  language?: string;
  platform?: string;
  repo?: string;

  constructor(public shortName: string) {
    const lowerShortName = shortName.toLowerCase();
    const codebase = codebases.find(c => lowerShortName.localeCompare(c.shortName.toLowerCase()) === 0);

    if (codebase) {
      this.exists = true;
      this.name = codebase?.name;
      this.description = codebase?.description;
      this.family = codebase?.family;
      this.language = codebase?.language;
      this.platform = codebase?.platform;
      this.platform = codebase?.platform;
      this.repo = codebase?.repo;
    }
  }

  getFormattedName(): string {
    if (!this.name) {
      return this.shortName;
    }

    if (this.repo) {
      return `<a href="${this.repo}">${this.name}</a>`;
    }

    return this.name;
  }
}

