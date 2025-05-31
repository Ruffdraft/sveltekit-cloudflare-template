import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform }) => {
  const data = await platform.env.TENTRAIT_KV.get(`analysis:${params.filename}`);
  if (!data) return new Response('Not found', { status: 404 });
  return new Response(data, { headers: { 'Content-Type': 'application/json' } });
};