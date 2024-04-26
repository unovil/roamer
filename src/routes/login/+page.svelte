<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  export let form: ActionData;
  let isHidden = true;
  console.log(`form is ${form}`);

  const changePasswordVisibility = () => {
    if (isHidden == true) isHidden = false;
    else isHidden = true;
  };

  // conditional css, if needed
  /* form?.invalidEmail
  form?.invalidUser
  form?.invalidPass
  form?.incorrectPass */
</script>

<div class="flex h-screen items-center justify-center bg-gray-100">
  <div
    class="font-sans-serif w-80 rounded-lg bg-white p-6 text-center shadow-md"
  >
    <h2
      class="font-semi-bold mb-6 flex scale-150 transform items-center justify-center font-trocchi text-lg text-log-in-green"
    >
      <img src="/logo.png" alt="Logo" class="mr-2 h-8" />
      Roamer
    </h2>

    {#if form?.error}
      <p class="mb-2 overflow-auto break-words text-red-600">{form.error}</p>
    {/if}

    <form method="post" use:enhance>
      <input
        type="email"
        placeholder="Email address"
        name="email"
        class="mb-2 block w-full rounded-md border border-gray-300 p-2 shadow"
        class:border-red-500={form?.invalidEmail || form?.invalidUser}
      />
      <div class="relative">
        <input
          type={isHidden ? "password" : "text"}
          placeholder="Password"
          name="password"
          class="mb-2 block w-full rounded-md border border-gray-300 p-2 shadow"
          id="password"
          class:border-red-500={form?.incorrectPass || form?.invalidPass}
        />

        <button
          type="button"
          on:click={changePasswordVisibility}
          class="absolute inset-y-0 right-0 rounded-md bg-gray-200 px-3 py-2 text-gray-600"
        >
          {isHidden ? "Show" : "Hide"}
        </button>
      </div>
      <button
        type="submit"
        class="mt-5 rounded-md bg-log-in-green px-4 py-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
      >
        Login
      </button>
    </form>

    <div class="mt-5">
      Not a user yet? <a
        href="/register"
        class="mt-1 text-green-500 hover:text-log-in-green"
      >
        Register here.
      </a>
    </div>
  </div>
</div>
