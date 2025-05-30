export const POST = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;

	if (!file || !file.name.endsWith('.pcap')) {
		return new Response('Invalid file type', { status: 400 });
	}

	const buffer = await file.arrayBuffer();
	console.log(`Received ${file.name} (${buffer.byteLength} bytes)`);

	// TODO: Save to R2 or send to analysis tool
	return new Response('Upload received', { status: 200 });
};
