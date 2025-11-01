// src/lib/client-active-talkers.ts
import type { ActiveTalkerList } from '$lib/types';

let cachedData: ActiveTalkerList | null = null;
let loadingPromise: Promise<ActiveTalkerList> | null = null;

export async function getActiveTalkers(forceRefresh = false): Promise<ActiveTalkerList> {
  if (!forceRefresh && cachedData) {
    return cachedData;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = fetch('/api/active-talkers')
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch active talkers: ${res.status}`);
      return res.json() as Promise<ActiveTalkerList>;
    })
    .then(data => {
      cachedData = data;
      loadingPromise = null;
      return data;
    })
    .catch(err => {
      loadingPromise = null;
      console.error('getActiveTalkers error:', err);
      throw err;
    });

  return loadingPromise;
}

export async function refreshActiveTalkers() {
  return getActiveTalkers(true);
}
