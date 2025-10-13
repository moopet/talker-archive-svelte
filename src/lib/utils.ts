import slugify from 'slugify';
import { talkers } from '$lib/data/talkers.json';

export async function getActiveTalkers() {
  const now = new Date();
  // Cache lasts 10 minutes.
  const cacheBust = `${now.getDate()}-${now.getHours()}-${Math.floor(now.getMinutes() / 10)}`;

  const response = await fetch(`/api/active-talkers?cb=${cacheBust}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}

export function getNounArticle(noun: string): string {
  const initial = noun.toLowerCase()[0];
  const vowelish = "aeiouy";

  return vowelish.includes(initial) ? 'an' : 'a';
}

export async function isTalkerActive(talker: Talker): Promise<boolean> {
  const activeTalkers = await getActiveTalkers();

  return activeTalkers.talkers.some(activeTalker => activeTalker.name === talker.name);
}

export async function getTalkerStatus(talker: Talker): Promise<string> {
  if (talker.hosts.length === 0) {
    return 'unknown';
  }

  if (talker.hosts.every(host => host?.blocked)) {
    return 'defunct';
  }

  return await isTalkerActive(talker) ? 'active' : 'unknown';
}

export function getTalkerSlug(talker: Talker): string {
  if (talker?.slug) {
    return talker.slug;
  }

  return slugify(talker.name, { lower: true }).replace(/^the-/, '').replace(/'/, '');
}

export function findTalkersBySpod(spodName: string): Talker[] {
  return talkers.filter(talker => {
    const admins = (talker?.admins ?? []).map(x => x.toLowerCase());
    const coders = (talker?.coders ?? []).map(x => x.toLowerCase());

    return [...coders, ...admins].includes(spodName.toLowerCase());
  });
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
