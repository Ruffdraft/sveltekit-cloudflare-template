import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;
	const turnstileToken = formData.get('cf-turnstile-response');
	const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';

	// Rate limit by IP
	const recent = await platform.env.TENTRAIT_UPLOAD_LOGS.get(ip);
	if (recent) return new Response('Please wait before uploading again.', { status: 429 });
	await platform.env.TENTRAIT_UPLOAD_LOGS.put(ip, 'true', { expirationTtl: 30 });

	// Turnstile CAPTCHA validation
	const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			secret: platform.env.TURNSTILE_SECRET,
			response: String(turnstileToken),
			remoteip: ip,
		})
	});
	const data = await res.json();
	if (!data.success) {
		return new Response('CAPTCHA verification failed.', { status: 403 });
	}

	if (!file || (!file.name.endsWith('.pcap') && !file.name.endsWith('.pcapng'))) {
		return new Response('Only .pcap or .pcapng files are allowed.', { status: 400 });
	}

	const arrayBuffer = await file.arrayBuffer();
	const magicBytes = new Uint8Array(arrayBuffer.slice(0, 4));
	const isPcapMagic =
		(magicBytes[0] === 0xd4 && magicBytes[1] === 0xc3) || // pcap little
		(magicBytes[0] === 0xa1 && magicBytes[1] === 0xb2) || // pcap big
		(magicBytes[0] === 0x0a && magicBytes[1] === 0x0d);   // pcapng

	if (!isPcapMagic) {
		return new Response('Invalid PCAP format.', { status: 400 });
	}

	const filename = `${Date.now()}-${file.name}`;

	try {
		await platform.env.TENTRAIT_UPLOADS.put(filename, arrayBuffer);

		// ✅ Enqueue for analysis
		await platform.env.TENTRAIT_ANALYSIS_QUEUE.send({
			filename,
			uploadedAt: Date.now(),
			ip
		});

		return new Response(`File ${filename} uploaded successfully.`, { status: 200 });
	} catch (err) {
		console.error('R2 Upload Error:', err);
		return new Response('Upload failed.', { status: 500 });
	}
};
