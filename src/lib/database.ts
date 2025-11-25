import slugify from 'slugify';
import { codebases, dataOrigins, resources, talkers } from '$lib/data/talkers.json';

export function getSlug(text: string): string {
  return slugify(text.replace(/^A /, ''), { lower: true }).replace(/^the-/, '').replace(/[^a-z0-9-]/, '');
}

export function getTalker(params): Talker {
  const slug = params.slug ?? getSlug(params.name);

  return talkers.find(talker => (talker.slug ?? getSlug(talker.name)) === slug);
}

export function getTalkers(params = {}): Talker[] {
  const order: string = (params.order ?? 'asc').toLowerCase();
  let results: Talker[] = [...talkers];

  results = results.map((talker, index) => {
    return {...talker, id: index}
  });

  if (params.codebase) {
    results = results.filter(talker => talker.codebase === params.codebase)
  }

  if (params.dataOrigin) {
    results = results
      .filter(talker => talker.dataOrigins)
      .filter(talker => talker.dataOrigins.some(x => x.dataOrigin === params.dataOrigin));
  }

  if (params.group) {
    results = results.filter(talker => talker.group === params.group);
  }

  if (params.multiWorld) {
    results = results.filter(talker => talker.multiWorld === params.multiWorld);
  }

  if (params.host) {
    results = results
      .filter(talker => talker.hosts)
      .filter(talker => talker.hosts.some(x => x.hostname === params.host.hostname && x.port === params.host.port));
  }

  results.sort((a: Talker, b: Talker): number => {
    const aSlug: string = (a.slug ?? getSlug(a.name)).replace('_', '');
    const bSlug: string = (b.slug ?? getSlug(b.name)).replace('_', '');

    return aSlug.localeCompare(bSlug);
  });

  if (order === 'desc') {
    results.reverse();
  }

  return results;
}

export function getCodebase(shortName: string): Codebase {
  return codebases.find(x => x.shortName === shortName);
}

export function getCodebases(): Codebase[] {
  return [...codebases].sort((a, b) => a.shortName.localeCompare(b.shortName));
}

export function getDataOrigin(shortName: string): DataOrigin {
  return dataOrigins.find(x => x.shortName === shortName);
}

export function getDataOrigins(): DataOrigin[] {
  return [...dataOrigins].sort((a, b) => a.shortName.localeCompare(b.shortName));
}

export function getGroup(shortName: string): Group {
  return groups.find(x => a.shortName === shortName);
}

export function getGroups(): Group[] {
  return [...groups].sort((a, b) => a.shortName.localeCompare(b.shortName));
}

export function getMultiWorld(shortName: string): MultiWorld {
  return multiWorlds.find(x => x.shortName === shortName);
}

export function getMultiWorlds(): MultiWorld[] {
  return [...multiWorlds].sort((a, b) => a.shortName.localeCompare(b.shortName));
}

export function getResources(): Resource[] {
  return resources;
}

