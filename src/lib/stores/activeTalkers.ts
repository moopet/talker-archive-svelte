// src/lib/stores/activeTalkers.ts
import { get, writable } from 'svelte/store';
import type { ActiveTalkerList } from '$lib/types';

export const activeTalkersStore = writable<ActiveTalkerList | null>(null);

export function getActiveTalkers(): ActiveTalkerList | null {
  return get(activeTalkersStore);
}
