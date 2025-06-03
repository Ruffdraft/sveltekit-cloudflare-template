import { writable } from "svelte/store";
import { browser } from "$app/environment";

/* user's all login_sessions and past activities, to show in /dashboard/sessions page */
export const sessions_and_activities = writable({
  login_sessions: [],
  activities: [],
  fetched_at: null,
});

// theme store to toggle between light and dark mode
let initial_theme = 'light';
if (browser) {
  const saved = localStorage.getItem('theme');
  if (saved) {
    initial_theme = saved;
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

export const theme = writable(initial_theme);

if (browser) {
  theme.subscribe((value) => {
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
  });
}
