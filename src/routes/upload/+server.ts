// src/routes/upload/+server.ts
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;

	if (!file || !file.name.endsWith('.pcap')) {
		return new Response('Only .pcap files are allowed.', { status: 400 });
	}

	// Read the file as binary
	const arrayBuffer = await file.arrayBuffer();
	const filename = `${Date.now()}-${file.name}`;

	// Put file into Cloudflare R2 bucket
	try {
		const r2 = platform?.env?.TENTRAIT_UPLOADS;
		if (!r2) {
			return new Response('R2 binding missing', { status: 500 });
		}

		await r2.put(filename, arrayBuffer);

		return new Response(`Uploaded ${filename} to R2`, { status: 200 });
	} catch (err) {
		console.error('Upload error:', err);
		return new Response('Upload failed', { status: 500 });
	}
};
