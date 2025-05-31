
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    throw error(400, 'No file uploaded.');
  }

  // Return a simple success response
  return new Response(`Received file: ${file.name}, size: ${file.size}`);
};
