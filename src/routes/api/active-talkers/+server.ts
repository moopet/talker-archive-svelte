import { STATUS_JSON_URL } from '$env/static/private';
import type { ActiveTalkerList } from '$lib/types';

export async function GET(): Promise<Response> {
  const response = await fetch(STATUS_JSON_URL);

  if (!response.ok) {
    return new Response("Failed to fetch data", { status: 502 });
  }

  const data: ActiveTalkerList = await response.json();

  return Response.json(data);
}
