<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import PrivacyPolicy from "./PrivacyPolicy.svelte";
  import { Label, Helper, Modal, Checkbox } from "flowbite-svelte";
  export let form: ActionData;
  let password = "",
    confirmPassword = "";

  let clickOutsideModal = false;
  let value = false;

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
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

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
          type="password"
          placeholder="Password"
          name="password"
          bind:value={password}
          class="mb-2 block w-full rounded-md border border-gray-300 p-2 shadow"
          class:border-red-500={form?.invalidPass}
        />
      </div>

      <div class="relative">
        <input
          type="password"
          placeholder="Confirm Password"
          bind:value={confirmPassword}
          class="mb-2 block w-full rounded-md border border-gray-300 p-2 shadow"
          class:border-red-500={form?.invalidPass}
        />
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
      <div class="mb-6 mt-2">
        <Checkbox bind:checked={value}
          ><span
            >I agree to the <button
              type="button"
              class="text-primary-700 hover:underline"
              on:click={() => {
                clickOutsideModal = true;
              }}>Privacy Policy</button
            >.</span
          ></Checkbox
        >
      </div>
      <button
        type="submit"
        disabled={!value}
        class="rounded-md px-4 py-2 text-white shadow transition duration-300 ease-in-out {value
          ? 'bg-log-in-green hover:bg-green-500'
          : 'bg-gray-300'}"
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

<Modal
  title="Privacy Policy"
  bind:open={clickOutsideModal}
  autoclose
  outsideclose
>
  <PrivacyPolicy />
</Modal>
