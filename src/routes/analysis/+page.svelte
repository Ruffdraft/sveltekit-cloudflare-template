<script>
  export let data;
</script>

<main class="max-w-4xl mx-auto p-6">
  <h1 class="text-3xl font-bold text-gray-800 mb-6">Recent Analysis Files</h1>

  {#if data?.length}
    <ul class="divide-y divide-gray-200 bg-white rounded shadow">
      {#each data as item}
        <li class="p-4 hover:bg-gray-50">
          <a href={"/analysis/" + item} class="text-blue-600 hover:underline">{item}</a>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-gray-500">No files found in recent analysis.</p>
  {/if}
</main>