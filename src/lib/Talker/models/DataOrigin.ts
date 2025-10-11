import { dataOrigins } from '$lib/data/talkers.json';

export class DataOrigin {
  exists: boolean = false;
  name: string;
  link?: string;

  constructor(public shortName: string) {
    const lowerShortName = shortName.toLowerCase();
    const dataOrigin = dataOrigins.find(d => lowerShortName.localeCompare(d.shortName.toLowerCase()) === 0);

    if (dataOrigin) {
      this.exists = true;
      this.name = dataOrigin?.name;
      this.link = dataOrigin?.link;
    }
  }

  getFormattedName(): string {
    if (!this.name) {
      return this.shortName;
    }

    if (this.link) {
      return `<a href="${this.kink}">${this.name}</a>`;
    }

    return this.name;
  }
}

