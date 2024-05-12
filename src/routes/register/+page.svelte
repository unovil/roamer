<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { Label, Helper, Input } from "flowbite-svelte";
  export let form: ActionData;
  let isHidden = true;

  const changePasswordVisibility = () => {
    isHidden = !isHidden;
  };

  let previewUrl = "";
  const onFileChange = (event: Event) => {
    const fileElement = event?.target as HTMLInputElement;
    const file = fileElement.files ? fileElement.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  // used for conditional css, if needed.
  /* form?.invalidEmail
    form?.invalidFirstName
    form?.invalidLastName
    form?.invalidPass
    form?.duplicateUser */
</script>

<svelte:head>
  <title>Roamer | Register</title>
</svelte:head>

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

    <form
      method="post"
      use:enhance={() => {
        return async ({ update }) => {
          await update();
        };
      }}
      enctype="multipart/form-data"
    >
      <input
        type="email"
        placeholder="Email address"
        name="email"
        class="mb-2 block w-full rounded-md border border-gray-300 p-2 shadow"
        class:border-red-500={form?.invalidEmail || form?.duplicateUser}
      />

      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        class="mb-2 block w-full rounded-md border border-gray-300 p-2 shadow"
        class:border-red-500={form?.invalidFirstName}
      />

      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        class="mb-2 block w-full rounded-md border border-gray-300 p-2 shadow"
        class:border-red-500={form?.invalidLastName}
      />

      <div class="relative">
        <input
          type={isHidden ? "password" : "text"}
          placeholder="Password"
          name="password"
          class="mb-2 block w-full rounded-md border border-gray-300 p-2 shadow"
          class:border-red-500={form?.invalidPass}
        />
        <button
          type="button"
          on:click={changePasswordVisibility}
          class="absolute inset-y-0 right-0 rounded-md bg-gray-200 px-3 py-2 text-gray-600"
        >
          {isHidden ? "Show" : "Hide"}
        </button>
      </div>

      <Label defaultClass="text-left text-sm rtl:text-right font-medium block"
        >Choose a profile picture: <span class="text-gray-500"
          >(Not required)</span
        ></Label
      >
      <div class="flex justify-center">
        <input
          type="file"
          name="pfp"
          class="w-full rounded-md shadow"
          accept=".jpg, .jpeg, .png"
          on:change={onFileChange}
        />
        {#if previewUrl}
          <img src={previewUrl} alt="Preview" class="h-24" />
        {/if}
      </div>
      <Helper
        helperClass="text-xs font-normal text-gray-500 dark:text-gray-300 text-left"
        >Upload a JPEG or PNG file.</Helper
      >
      <div class="mb-2 flex items-center justify-start"></div>
      <button
        type="submit"
        class="rounded-md bg-log-in-green px-4 py-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
      >
        Register
      </button>
    </form>
    <div class="mt-5">
      Registered already? <a
        href="/login"
        class="mt-1 text-green-500 hover:text-log-in-green"
      >
        Sign in here.
      </a>
    </div>
  </div>
</div>
