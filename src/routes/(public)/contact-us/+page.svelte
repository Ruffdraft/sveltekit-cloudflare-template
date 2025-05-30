<script>
  import { WEBSITE_NAME, TURNSTILE_SITEKEY } from "$config";
  import { enhance, applyAction } from "$app/forms";
  import { Turnstile } from "svelte-turnstile";
  import { browser } from "$app/environment";

  export let form;

  let errors = {};
  let error_message = "";
  let is_waiting = false;
  let show_success = false;

  const form_fields = [
    { id: "contact_name", label: "Your Name *", input_type: "text", autocomplete: "name" },
    { id: "email", label: "Email *", input_type: "email", autocomplete: "email" },
    { id: "phone", label: "Phone Number", input_type: "tel", autocomplete: "tel" },
    { id: "company", label: "Company Name", input_type: "text", autocomplete: "organization" },
    { id: "message", label: "Message", input_type: "textarea", autocomplete: "off" },
  ];

  const handle_submit = ({ formData, cancel }) => {
    is_waiting = true;
    errors = {};
    error_message = "";

    const { contact_name, email } = Object.fromEntries(formData);
    const token = formData.get("cf-turnstile-response");

    if (!contact_name?.trim()) errors.contact_name = "required";
    if (!email?.trim()) errors.email = "required";
    else if (!email.includes("@")) errors.email = "invalid email";

    if (!token && Object.keys(errors).length === 0) error_message = "Please complete the CAPTCHA.";

    if (Object.keys(errors).length > 0) error_message = "Please correct the errors and try again.";

    if (error_message) {
      cancel();
      is_waiting = false;
    }

    return async ({ update, result }) => {
      await update({ reset: false });
      await applyAction(result);
      is_waiting = false;
      if (result.type === "success") show_success = true;
      else if (result.type === "failure") {
        errors = result.data?.errors ?? {};
        error_message = result.data?.error_message;
      }
    };
  };

  $: if (browser && form) reset?.();
  let reset;
</script>

<svelte:head>
  <title>Contact Us - {WEBSITE_NAME}</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10">
  <div class="lg:w-1/2">
    <h1 class="text-3xl font-bold mb-4">Contact Us</h1>
    <p class="text-lg mb-4">Talk to our team to:</p>
    <ul class="list-disc list-inside mb-4 space-y-1">
      <li>Request a live demo</li>
      <li>Discuss your needs</li>
      <li>Request a quote</li>
      <li>Get answers to technical questions</li>
    </ul>
    <p class="text-sm text-gray-600">We never share your data with third parties.</p>
  </div>

  <div class="lg:w-1/2">
    {#if show_success}
      <div class="card shadow p-6 bg-white rounded">
        <h2 class="text-xl font-bold mb-4">Thank you!</h2>
        <p>Your message has been received. We'll be in touch shortly.</p>
      </div>
    {:else}
      <form
        method="POST"
        action=""
        use:enhance={handle_submit}
        class="card shadow p-6 bg-white rounded space-y-4"
      >
        {#each form_fields as field}
          <div>
            <label for={field.id} class="block font-semibold mb-1">{field.label}</label>
            {#if field.input_type === "textarea"}
              <textarea
                id={field.id}
                name={field.id}
                rows="4"
                autocomplete={field.autocomplete}
                class="textarea textarea-bordered w-full"
              ></textarea>
            {:else}
              <input
                id={field.id}
                name={field.id}
                type={field.input_type}
                autocomplete={field.autocomplete}
                class="input input-bordered w-full"
              />
            {/if}
            {#if errors[field.id]}
              <p class="text-error text-sm mt-1">{errors[field.id]}</p>
            {/if}
          </div>
        {/each}

        <div class="mb-4">
          <Turnstile siteKey={TURNSTILE_SITEKEY} theme="light" bind:reset />
        </div>

        {#if error_message}
          <p class="text-error text-sm">{error_message}</p>
        {/if}

        <button type="submit" class="btn btn-primary w-full" disabled={is_waiting}>
          {#if is_waiting}
            <svg class="animate-spin mx-auto h-5 w-5" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="#000" stroke-width="4" />
            </svg>
          {:else}
            Submit
          {/if}
        </button>
      </form>
    {/if}
  </div>
</div>
