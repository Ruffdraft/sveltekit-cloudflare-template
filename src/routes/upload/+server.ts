// src/routes/upload/+server.ts
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;

	if (!file || !file.name.endsWith('.pcap')) {
		return new Response('Only .pcap files are allowed.', { status: 400 });
	}

	const arrayBuffer = await file.arrayBuffer();
	const filename = `${Date.now()}-${file.name}`;

	try {
		// ✅ Upload to your R2 bucket here:
		await platform.env.TENTRAIT_UPLOADS.put(filename, arrayBuffer);

		return new Response(`File ${filename} uploaded successfully.`, { status: 200 });
	} catch (err) {
		console.error('R2 Upload Error:', err);
		return new Response('Upload failed.', { status: 500 });
	}
};
