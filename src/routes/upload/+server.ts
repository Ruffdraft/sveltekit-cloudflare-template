import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const turnstileToken = formData.get('cf-turnstile-response');
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';

  // CAPTCHA validation
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: platform.env.TURNSTILE_SECRET,
      response: String(turnstileToken),
      remoteip: ip
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
  const filename = `${Date.now()}-${file.name}`;

  try {
    await platform.env.TENTRAIT_UPLOADS.put(filename, arrayBuffer);
    await platform.env.TENTRAIT_ANALYSIS_QUEUE.send({ filename, uploadedAt: Date.now(), ip });
    return new Response(`File ${filename} uploaded successfully.`, { status: 200 });
  } catch (err) {
    console.error('Upload error:', err);
    return new Response('Upload failed.', { status: 500 });
  }
};
