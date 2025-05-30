<script lang="ts">
	let message: string | null = null;

	async function handleUpload(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		const res = await fetch('/upload', {
			method: 'POST',
			body: formData
		});

		message = await res.text();
	}
</script>

<h1 class="text-2xl font-bold mb-4">Upload a PCAP File</h1>

<form on:submit={handleUpload} enctype="multipart/form-data" class="space-y-4">
	<input
		type="file"
		name="file"
		accept=".pcap"
		required
		class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
	/>

	<button
		type="submit"
		class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
	>
		Upload
	</button>
</form>

{#if message}
	<p class="mt-4 text-green-600 font-medium">{message}</p>
{/if}
