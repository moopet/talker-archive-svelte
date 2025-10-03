import { env } from '$env/static/private';

export async function GET() {
  return await fetch(env.STATUS_JSON_URL);
}
