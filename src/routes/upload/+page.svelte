
<script lang="ts">
  import { Turnstile } from "svelte-turnstile";
  const PUBLIC_TURNSTILE_SITEKEY = import.meta.env.PUBLIC_TURNSTILE_SITEKEY;

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

<main class="max-w-3xl mx-auto py-16 px-6 text-gray-800">
  <h1 class="text-4xl font-extrabold mb-4 text-primary">Upload a PCAP File for Analysis</h1>
  <p class="text-lg text-gray-600 mb-8">Upload a <strong>.pcap</strong> or <strong>.pcapng</strong> file for advanced traffic diagnostics.</p>

  <form on:submit={handleUpload} enctype="multipart/form-data" class="space-y-6 bg-white shadow-lg p-8 rounded-xl border border-gray-200">
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2" for="file">Choose PCAP File:</label>
      <input type="file" name="file" accept=".pcap,.pcapng" required
        on:change={(e) => {
          const file = e.target.files?.[0];
          if (file && file.size > 10_000_000) {
            alert('Max file size is 10MB');
            e.target.value = '';
            selectedFile = null;
          } else {
            selectedFile = file;
          }
        }}
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
      {#if selectedFile}
        <p class="mt-1 text-sm text-gray-500">Selected: {selectedFile.name}</p>
      {/if}
    </div>

    <div class="pt-2">
      <Turnstile sitekey={PUBLIC_TURNSTILE_SITEKEY} on:success={(e) => token = e.detail.token} />
    </div>

    <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition disabled:opacity-50"
      disabled={uploading}>
      {uploading ? 'Uploading…' : 'Upload File'}
    </button>

    {#if message}
      <div class={`mt-4 px-4 py-3 rounded-lg text-sm font-medium ${messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-300' : 'bg-red-50 text-red-800 border border-red-300'}`}>
        {message}
      </div>
    {/if}
  </form>
</main>

<style>
  :global(.text-primary) {
    color: #004578;
  }
  :global(.bg-primary) {
    background-color: #004578;
  }
  :global(.hover\:bg-primary-dark:hover) {
    background-color: #00335a;
  }
  :global(.focus\:ring-primary) {
    --tw-ring-color: #004578;
  }
  :global(.focus\:border-primary) {
    border-color: #004578;
  }
</style>
