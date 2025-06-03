import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  kit: {
    adapter: adapter(),
    alias: {
      $config: './src/config.js',
      $appcss: './src/app.css',
      $store: './src/store.js'
    }
  },
  preprocess: vitePreprocess()
};
