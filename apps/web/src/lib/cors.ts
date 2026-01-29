// Simplified CORS for v1 - extension doesn't need credentials
export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export function withCors(res: Response) {
  const headers = new Headers(res.headers);
  const cors = corsHeaders();
  for (const [k, v] of Object.entries(cors)) headers.set(k, v);
  return new Response(res.body, { status: res.status, headers });
}

export function optionsResponse() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
