<script>
  export let data;
</script>

<svelte:head>
  <title>Security News</title>
  <meta name="description" content="Latest IT/OT security headlines" />
</svelte:head>

<div class="py-8 lg:py-12 px-6 max-w-2xl mx-auto">
  <h1 class="text-3xl lg:text-5xl font-medium text-primary text-center mb-6">
    IT/OT Security News
  </h1>
  {#if data.news.length === 0}
    <p>No news available.</p>
  {:else}
    <ul class="space-y-4">
      {#each data.news as item}
        <li class="border-b pb-2">
          <a href={item.link} target="_blank" rel="noreferrer" class="text-lg text-primary underline">
            {item.title}
          </a>
          <div class="text-sm text-slate-500">
            {new Date(item.pubDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
