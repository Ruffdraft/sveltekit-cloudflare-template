<script lang="ts">
	let message: string | null = null;
	let messageType: 'success' | 'error' | null = null;
	let uploading = false;
	let selectedFile: File | null = null;

	async function handleUpload(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		uploading = true;
		message = null;

		try {
			const res = await fetch('/upload', {
				method: 'POST',
				body: formData
			});

			messageType = res.ok ? 'success' : 'error';
			message = await res.text();
		} catch (err) {
			messageType = 'error';
			message = 'Upload failed.';
		} finally {
			uploading = false;
			form.reset();
			selectedFile = null;
		}
	}
</script>

<main class="max-w-2xl mx-auto p-6">
	<h1 class="text-3xl font-bold mb-2 text-gray-800">Upload a PCAP File for Analysis</h1>
	<p class="text-gray-600 mb-6">
		Use this page to upload a <strong>.pcap</strong> (packet capture) file from Wireshark or tcpdump. Once uploaded, your file will be securely stored in Tentrait’s private cloud and analyzed for:
	</p>

	<ul class="list-disc list-inside mb-6 text-gray-700">
		<li>Communication flows and protocol usage</li>
		<li>Unusual ports or traffic spikes</li>
		<li>Device IP mapping (source/destination)</li>
		<li>Initial security assessment</li>
	</ul>

	<div class="bg-white shadow-md p-6 rounded-lg border border-gray-200">
		<form on:submit={handleUpload} enctype="multipart/form-data" class="space-y-4">
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1" for="file">Choose PCAP File:</label>
				<input
					type="file"
					name="file"
					id="file"
					accept=".pcap"
					required
					on:change={(e) => {
						const file = e.target.files?.[0];
						if (file) {
							if (file.size > 10_000_000) {
								alert('Max file size is 10MB');
								e.target.value = '';
								selectedFile = null;
							} else {
								selectedFile = file;
							}
						}
					}}
					class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50"
				/>
				{#if selectedFile}
					<p class="mt-1 text-sm text-gray-500">Selected: {selectedFile.name}</p>
				{/if}
			</div>

			<button
				type="submit"
				class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto"
				disabled={uploading}
			>
				{uploading ? 'Uploading…' : 'Upload File'}
			</button>
		</form>

		{#if message}
			<p class={`mt-4 text-sm font-medium ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
				{message}
			</p>
		{/if}
	</div>

	<div class="mt-8 text-sm text-gray-500">
		<p><strong>Note:</strong> All data is processed securely and will be available only to authorized users of Tentrait Ltd.</p>
		<p class="mt-2">Need help? Contact <a href="mailto:support@tentrait.com" class="text-blue-600 underline">support@tentrait.com</a>.</p>
	</div>
</main>
