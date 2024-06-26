<script lang="ts">
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import type { ActionData, PageData } from "./$types";
  import { Avatar, Label, Helper } from "flowbite-svelte";
  import { Heading } from "flowbite-svelte";

  export let data: PageData;
  export let form: ActionData;
  let showSuccess = false;
  let previewUrl = "";
  let showPreview = true; // Add this line
  const onFileChange = (event: Event) => {
    const fileElement = event?.target as HTMLInputElement;
    const file = fileElement.files ? fileElement.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewUrl = reader.result as string;
        showPreview = true; // Add this line
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    // Your existing code to update the profile picture here
    showPreview = false;
  };

  $: if (form?.success) {
    showSuccess = true;

    setTimeout(() => {
      showSuccess = false;
    }, 5000);
  }

  let newEmail = "",
    confirmEmail = "",
    newPassword = "",
    confirmPassword = "";
</script>

<div class="ml-72 mt-16 flex items-start justify-start space-x-4">
  <div class="mr-10 flex flex-col items-center">
    {#if data.user?.pfp.length == 0}
      <Avatar class="h-56 w-56"
        >{data.user?.firstName[0]}{data.user?.lastName[0]}</Avatar
      >
    {:else}
      <Avatar class="h-56 w-56" src={data.user?.pfp} />
    {/if}
    <div class="mt-6">
      <p class="text-center text-3xl font-extrabold text-log-in-green">
        {data.user?.firstName}
        {data.user?.lastName}
      </p>
      <p class="text-center text-base font-medium text-gray-400">
        {data.user?.email}
      </p>
      <p class="text-center text-base font-medium text-green-400">
        {data.user?.role}
      </p>
    </div>
  </div>

  <div>
    {#if form?.error && form?.type == "password"}
      <p class="text-sm font-semibold text-red-800">{form.error}</p>
    {/if}
    <Heading tag="h3" class="mb-2">Change password</Heading>

    <form
      method="post"
      action="?/changePassword"
      use:enhance={() => {
        if (newPassword !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        return async ({ update }) => {
          await update();
        };
      }}
    >
      <label for="currentPassword" class="font-semibold text-green-700"
        >Your current password:</label
      >
      <br />
      <input
        type="password"
        name="currentPassword"
        class=" w-96 rounded-md border border-gray-400 shadow"
      />
      <br />
      <label for="currentPassword" class="font-semibold text-green-700"
        >Your new password:</label
      >
      <br />
      <input
        type="password"
        name="newPassword"
        bind:value={newPassword}
        class=" w-96 rounded-md border border-gray-400 shadow"
      />
      <br />
      <label for="confirmPassword" class="font-semibold text-green-700"
        >Confirm your new password:</label
      >
      <br />
      <input
        type="password"
        bind:value={confirmPassword}
        class="w-96 rounded-md border border-gray-400 shadow"
      />
      <br />
      <button
        type="submit"
        class="mb-4 mt-3 rounded-md bg-log-in-green px-4 py-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
        >Change password</button
      >
      {#if form?.success && form?.type == "password" && showSuccess}
        <span class="text-sm font-semibold text-primary-600"
          >{form.success}</span
        >
      {/if}
    </form>

    {#if form?.error && form?.type == "email"}
      <p class="text-sm font-semibold text-red-800">{form.error}</p>
    {/if}
    <Heading tag="h3" class="mb-2">Change email</Heading>
    <form
      method="post"
      action="?/changeEmail"
      use:enhance={() => {
        if (newEmail !== confirmEmail) {
          alert("Emails do not match!");
          return;
        }

        return async ({ update }) => {
          await update();
        };
      }}
    >
      <label for="newEmail" class="font-semibold text-green-700"
        >Your new email:</label
      >
      <br />
      <input
        type="email"
        name="newEmail"
        placeholder={data.user?.email}
        bind:value={newEmail}
        class=" w-96 rounded-md border border-gray-400 shadow"
      />
      <br />
      <label for="confirmEmail" class="font-semibold text-green-700"
        >Confirm your new email:</label
      >
      <br />
      <input
        type="email"
        bind:value={confirmEmail}
        class=" w-96 rounded-md border border-gray-400 shadow"
      />
      <br />
      <button
        type="submit"
        class="mb-4 mt-3 rounded-md bg-log-in-green px-4 py-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
        >Change email</button
      >
      {#if form?.success && form?.type == "email" && showSuccess}
        <span class="text-sm font-semibold text-primary-600"
          >{form.success}</span
        >
      {/if}
    </form>

    {#if form?.error && form?.type == "pfp"}
      <p class="text-sm font-semibold text-red-800">{form.error}</p>
    {/if}
    <form
      action="?/changePfp"
      method="post"
      use:enhance
      enctype="multipart/form-data"
      on:submit|preventDefault={onSubmit}
    >
      <Label defaultClass="text-left text-sm rtl:text-right font-medium block">
        <Heading tag="h3" class="mb-2">Choose a profile picture</Heading>
      </Label>
      <div class="justify-left flex">
        <input
          type="file"
          name="newPfp"
          class="w-auto rounded-md shadow"
          accept=".jpg, .jpeg, .png"
          on:change={onFileChange}
        />
        {#if previewUrl && showPreview}
          <!-- Update this line -->
          <img src={previewUrl} alt="Preview" class="h-24" />
        {/if}
      </div>
      <Helper
        helperClass="text-xs font-normal text-gray-500 dark:text-gray-300 text-left"
        >Upload a JPEG or PNG file.</Helper
      >
      <br />
      <button
        type="submit"
        class="mb-10 rounded-md bg-log-in-green px-4 py-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
        >Change profile picture</button
      >
      {#if form?.success && form?.type == "pfp" && showSuccess}
        <span class="text-sm font-semibold text-primary-600"
          >{form.success}</span
        >
      {/if}
    </form>
  </div>
</div>
