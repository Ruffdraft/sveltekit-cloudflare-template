import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const res = await fetch(`/api/analysis/${params.filename}`);
  if (res.ok) {
    const data = await res.json();
    return { data };
  }

  return { data: null };
};