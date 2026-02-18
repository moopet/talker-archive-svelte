import { STATUS_JSON_URL } from '$env/static/private';
import type { ActiveTalkerList } from '$lib/types';

export async function GET(): Promise<ActiveTalkerList> {
  const response = await fetch(STATUS_JSON_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: ActiveTalkerList = await response.json();

  return data;
}
