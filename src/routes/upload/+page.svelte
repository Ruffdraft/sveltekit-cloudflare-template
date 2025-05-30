<script lang="ts">
	import { Turnstile } from "svelte-turnstile";
	import { TURNSTILE_SITEKEY } from "$config";

	let message: string | null = null;
	let messageType: 'success' | 'error' | null = null;
	let uploading = false;
	let selectedFile: File | null = null;
	let token: string | null = null;

	async function handleUpload(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		if (!token) {
			message = 'Please complete CAPTCHA';
			messageType = 'error';
			return;
		}

		formData.append("cf-turnstile-response", token);

		uploading = true;
		message = null;

		try {
			const res = await fetch('/upload', {
				method: 'POST',
				body: formData
			});
			messageType = res.ok ? 'success' : 'error';
			message = await res.text();
		} catch {
			messageType = 'error';
			message = 'Upload failed.';
		} finally {
			uploading = false;
			form.reset();
			selectedFile = null;
			token = null;
		}
	}
</script>

<main class="max-w-2xl mx-auto p-6">
	<h1 class="text-3xl font-bold mb-2 text-gray-800">Upload a PCAP File for Analysis</h1>
	<p class="text-gray-600 mb-6">Use this page to upload a <strong>.pcap</strong> or <strong>.pcapng</strong> file...</p>

	<form on:submit={handleUpload} enctype="multipart/form-data" class="space-y-6 bg-white shadow-md p-6 rounded-lg border border-gray-200">
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1" for="file">Choose PCAP File:</label>
			<input
				type="file"
				name="file"
				id="file"
				accept=".pcap,.pcapng"
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

		<Turnstile sitekey={TURNSTILE_SITEKEY} on:success={(e) => token = e.detail.token} />

		<button
			type="submit"
			class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
			disabled={uploading}
		>
			{uploading ? 'Uploading…' : 'Upload File'}
		</button>

		{#if message}
			<div
				class={`mt-4 px-4 py-3 rounded text-sm font-medium ${
					messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
				}`}
			>
				{message}
			</div>
		{/if}
	</form>
</main>
