<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";
  import { Avatar, Label, Helper } from "flowbite-svelte";

  export let data: PageData;
  export let form: ActionData;

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

  let newEmail = "",
    confirmEmail = "",
    newPassword = "",
    confirmPassword = "";
</script>

<h1>Your current profile:</h1>
<p>{data.user?.firstName} {data.user?.lastName}</p>
<p>{data.user?.email}</p>
<p>{data.user?.role}</p>
{#if data.user?.pfp.length == 0}
  <Avatar size="xl">{data.user?.firstName[0]}{data.user?.lastName[0]}</Avatar>
{:else}
  <Avatar size="xl" src={data.user?.pfp} />
{/if}

{#if form?.error && form?.type == "password"}
  <p>{form.error}</p>
{/if}
<p>Change password:</p>
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
  <label for="currentPassword">Your current password:</label>
  <input type="password" name="currentPassword" />
  <br />
  <label for="currentPassword">Your new password:</label>
  <input type="password" name="newPassword" bind:value={newPassword} />
  <br />
  <label for="confirmPassword">Confirm your new password:</label>
  <input type="password" bind:value={confirmPassword} />
  <br />
  <button type="submit">Change password</button>
</form>

{#if form?.error && form?.type == "email"}
  <p>{form.error}</p>
{/if}
<p>Change email:</p>
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
  <label for="newEmail">Your new email:</label>
  <input
    type="email"
    name="newEmail"
    placeholder={data.user?.email}
    bind:value={newEmail}
  />
  <br />
  <label for="confirmEmail">Confirm your new email:</label>
  <input type="email" bind:value={confirmEmail} />
  <br />
  <button type="submit">Change email</button>
</form>

{#if form?.error && form?.type == "pfp"}
  <p>{form.error}</p>
{/if}
<form
  action="?/changePfp"
  method="post"
  use:enhance
  enctype="multipart/form-data"
>
  <Label defaultClass="text-left text-sm rtl:text-right font-medium block">
    Choose a profile picture:
  </Label>
  <div class="justify-left flex">
    <input
      type="file"
      name="newPfp"
      class="w-auto rounded-md shadow"
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
  <br />
  <button type="submit">Change profile picture</button>
</form>
