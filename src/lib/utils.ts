import slugify from 'slugify';
import { talkers } from '$lib/data/talkers.json';
import { get } from 'svelte/store';
import { activeTalkersStore } from '$lib/stores/activeTalkers';

export function getNounArticle(noun: string): string {
  const initial = noun.toLowerCase()[0];
  const vowelish = "aeiouy";

  return vowelish.includes(initial) ? 'an' : 'a';
}

export function getActiveTalkers(): Promise<ActiveTalkerList> {
  return get(activeTalkersStore);
}

export async function isTalkerActive(talker: Talker): Promise<boolean> {
  const activeTalkers = get(activeTalkersStore);

  return (activeTalkers?.talkers ?? []).some(activeTalker => activeTalker.name === talker.name);
}

export async function getTalkerStatus(talker: Talker): Promise<string> {
  if (talker.hosts.every(host => host?.blocked)) {
    return 'defunct';
  }

  return await isTalkerActive(talker) ? 'active' : 'unknown';
}

export function getTalkerSlug(talker: Talker): string {
  if (talker?.slug) {
    return talker.slug;
  }

  return slugify(talker.name, { lower: true }).replace(/^the-/, '').replace(/[^a-z0-9-]/, '');
}

export function findTalkersByGroup(groupName: string): Talker[] {
  return talkers.filter(talker => (talker?.group ?? '').toLowerCase() === groupName.toLowerCase());
}

export function findTalkersByMultiWorld(multiWorldName: string): Talker[] {
  return talkers.filter(talker => (talker?.multiWorld ?? '').toLowerCase() === multiWorldName.toLowerCase());
}

export function findTalkersByHost(hostname: string, port: number): Talker[] {
  return talkers.filter(talker => {
    return (talker?.hosts ?? []).some(h => h.hostname === hostname && h.port === port);
  });
}

export function findTalkersBySpod(spodName: string): Talker[] {
  return talkers.filter(talker => {
    const admins = (talker?.admins ?? []).map(x => x.toLowerCase());
    const coders = (talker?.coders ?? []).map(x => x.toLowerCase());

    return [...coders, ...admins].includes(spodName.toLowerCase());
  });
}

export function sortTalkersByName(talkers: Talker[]): Talker[] {
  return talkers.sort((a, b) => getTalkerSlug(a).replace('_', '').localeCompare(getTalkerSlug(b).replace('_', '')));
}

export function findTalkerBySlug(slug: string): Talker {
  const explicitSlugMatch = talkers.find(talker => talker?.slug === slug);

  if (explicitSlugMatch) {
    return explicitSlugMatch;
  }

  const talker: Talker = talkers.find(talker => {
    const talkerSlug = slugify(talker.name, {lower: true});

    return [talkerSlug, talkerSlug.replace(/^the-/, '').replace(/'/, '')].includes(slug);
  });

  return talker;
}
