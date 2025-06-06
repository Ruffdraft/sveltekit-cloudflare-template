import { dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { log_message } from "$lib/server/log";

const place = "/membership";
const app_env = dev ? "development" : "production";

export async function load({ locals, platform }) {
  log_message(platform, app_env, place, "info", "page load start.");
  if (locals.user) {
    return { user: locals.user };
  }
  redirect(303, "/sign-in");
}
