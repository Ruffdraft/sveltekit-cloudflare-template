<script lang="ts">
  export let data;
</script>

<main class="max-w-3xl mx-auto p-6">
  <h1 class="text-2xl font-bold text-gray-800 mb-4">Analysis Result</h1>

  {#if data}
    <div class="bg-white shadow-md rounded p-4 border border-gray-200">
      <h2 class="text-lg font-semibold mb-2 text-gray-700">File: {data.filename}</h2>
      <p class="text-sm text-gray-500 mb-2">Uploaded from IP: {data.ip}</p>
      <p class="text-sm text-gray-500 mb-4">Analyzed: {new Date(data.analysisTime).toLocaleString()}</p>

      <ul class="list-disc list-inside space-y-1 text-sm text-gray-700">
        <li><strong>Total Packets:</strong> {data.results.totalPackets}</li>
        <li><strong>Protocols:</strong> {data.results.protocols.join(', ')}</li>
        <li><strong>Suspicious Ports:</strong> {data.results.suspiciousPorts.join(', ')}</li>
        <li><strong>Source IPs:</strong> {data.results.uniqueSrcIPs.join(', ')}</li>
      </ul>
    </div>
  {:else}
    <p class="text-red-600 font-medium">No data found for this file.</p>
  {/if}
</main>