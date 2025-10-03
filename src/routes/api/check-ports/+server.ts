import { STATUS_JSON_URL } from '$env/static/private';

console.log(STATUS_JSON_URL);

export async function GET() {
  return await fetch(STATUS_JSON_URL);
}
