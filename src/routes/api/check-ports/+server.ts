import { STATUS_JSON_URL } from '$env/static/private';

export async function GET() {
  return await fetch(STATUS_JSON_URL);
}
