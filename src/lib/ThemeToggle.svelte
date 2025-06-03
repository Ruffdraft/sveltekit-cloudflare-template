<script>
  import { theme } from "$store";
  import { get } from "svelte/store";

  function toggle() {
    theme.update((value) => (value === 'light' ? 'dark' : 'light'));
  }
</script>

<button class="btn btn-ghost btn-circle" on:click={toggle} aria-label="Toggle theme">
  {#if $theme === 'dark'}
    <!-- sun icon -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
      <path d="M12 1v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M12 21v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M4.22 4.22l1.42 1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M18.36 18.36l1.42 1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M1 12h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M21 12h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M4.22 19.78l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  {:else}
    <!-- moon icon -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="2" />
    </svg>
  {/if}
</button>
