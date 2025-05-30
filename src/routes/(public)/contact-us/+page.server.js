/// FILE: src/routes/contact-us/+page.server.js
import { fail } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { z } from "zod";
import { validate_turnstile_token } from "$lib/server/turnstile";
import { db_insert_contact_request } from "$lib/server/database";
import { log_message } from "$lib/server/log";

const place = "contact-us";
const app_env = dev ? "development" : "production";

const contact_schema = z.object({
  contact_name: z.string().min(1, "required").max(64, "too long").trim(),
  email: z.string().max(64, "too long").email("invalid email"),
  phone: z.string().max(64, "too long").trim().optional(),
  company: z.string().max(128, "too long").trim().optional(),
  message: z.string().max(2000, "max 2000 allowed characters").trim(),
});

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, platform }) => {
    log_message(platform, app_env, place, "info", "Form submission started.");

    const form_data_raw = await request.formData();
    const form_data = Object.fromEntries(form_data_raw);

    const turnstile_token = form_data_raw.get("cf-turnstile-response");
    const res_validate_tt = await validate_turnstile_token(
      turnstile_token,
      platform.env.TURNSTILE_SECRET_KEY
    );

    if (res_validate_tt.error) {
      log_message(platform, app_env, place, "warn", "CAPTCHA failed: " + res_validate_tt.message);
      return fail(400, {
        error: true,
        error_message: "Please complete the CAPTCHA verification.",
      });
    }

    try {
      contact_schema.parse(form_data);
    } catch (err) {
      const { fieldErrors: errors } = err.flatten();
      log_message(platform, app_env, place, "info", "Validation failed: " + JSON.stringify(errors));
      return fail(400, {
        error: true,
        errors,
        error_message: "Please correct the highlighted fields.",
      });
    }

    const contact_info = {
      contact_name: form_data.contact_name.trim(),
      email: form_data.email.trim(),
      phone: form_data.phone?.trim() || "",
      company: form_data.company?.trim() || "",
      message: form_data.message.trim(),
    };

    const res_insert = await db_insert_contact_request(platform, request.headers, contact_info);

    if (res_insert.error) {
      await log_message(platform, app_env, place, "error", "DB Insert failed: " + res_insert.message, contact_info.email);
      return fail(500, {
        error: true,
        error_message: "Internal server error. Please try again later.",
      });
    }

    log_message(platform, app_env, place, "info", "DB insert successful.");
    await send_contact_request_to_lark(platform, contact_info);

    return {
      success: true,
      message: "Message sent successfully. We'll be in touch shortly.",
    };
  },
};

async function send_contact_request_to_lark(platform, contact_info) {
  const time_readable = new Date().toISOString() + " UTC";

  const content = `Name: ${contact_info.contact_name}\nEmail: ${contact_info.email}\nPhone: ${contact_info.phone}\nCompany: ${contact_info.company}\n\nMessage: ${contact_info.message}\n\n${time_readable}`;

  const message = {
    msg_type: "post",
    content: {
      post: {
        en_us: {
          title: "New Contact Request",
          content: [[{ tag: "text", text: content }]],
        },
      },
    },
  };

  try {
    const response = await fetch(platform.env.LARK_BOT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    log_message(platform, app_env, place, "info", "Lark notification sent successfully.");
    return { success: true };
  } catch (err) {
    await log_message(platform, app_env, place, "error", "Lark notification failed: " + err.message);
    return { error: true };
  }
}
