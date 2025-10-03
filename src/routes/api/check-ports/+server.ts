export async function GET() {
  return await fetch(process.env.STATUS_JSON_URL);
}
