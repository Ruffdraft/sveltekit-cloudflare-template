<script>
  import "$appcss";
  import { WEBSITE_NAME } from "$config";
  export let data;
  const { user } = data;
</script>

<svelte:head>
  <title>Members Area - {WEBSITE_NAME}</title>
</svelte:head>

<div class="container mx-auto py-8">
  <h1 class="text-3xl font-bold mb-4">Welcome to the Members Area</h1>
  <p class="mb-2">Hello {user.nickname}, you have successfully accessed the protected members area.</p>
  <p>Only logged-in users can see this content.</p>
</div>
