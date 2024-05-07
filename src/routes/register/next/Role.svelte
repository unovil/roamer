<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  export let form: ActionData;
  export let error: string | undefined;

  let role: "ADMIN" | "STUDENT" | null = null;
</script>

<div class="flex h-screen items-center justify-center bg-gray-100">
  <div
    class="font-sans-serif w-full rounded-lg bg-white p-6 text-center shadow-md sm:w-3/4 md:w-2/5"
  >
    <h2
      class="mb-2 flex scale-150 transform items-center justify-center text-2xl font-bold text-log-in-green"
    >
      Welcome to <p class="ml-2 font-trocchi">Roamer</p>
      <img src="/logo.png" alt="Logo" class="ml-2 mr-2 h-8" />
      !
    </h2>
    <p class="text-md mb-3 mt-1 flex justify-center font-medium">
      Before continuing, we just need you to answer these.
    </p>

    {#if error}
      <p class="flex justify-center whitespace-normal font-bold text-red-600">
        {error}
      </p>
    {/if}

    {#if !(typeof form?.error == "undefined" && form?.response.schoolName && form?.response.sections.length != 0)}
      <form
        method="post"
        action="?/role"
        use:enhance={({ formData }) => {
          // construct an append formdata with the name of role, and the value being
          // either student or admin based on the user's input, also add validation.
          formData.append("role", role || "");

          return async ({ update }) => {
            await update();
          };
        }}
      >
        <p class="mb-4 mt-6 flex justify-center text-2xl font-bold">
          You are...
        </p>

        <div class="flex justify-center">
          <button
            type="button"
            class="h-10 w-40 items-center justify-center rounded-md border border-gray-400 {role ==
            'ADMIN'
              ? 'bg-green-500'
              : 'hover:bg-green-700'} mb-1"
            on:click={() => {
              role = "ADMIN";
            }}
          >
            an Admin
          </button>

          <button
            type="button"
            class="ml-6 h-10 w-40 items-center justify-center rounded-md border border-gray-400 {role ==
            'STUDENT'
              ? 'bg-green-500'
              : 'hover:bg-green-700'}"
            on:click={() => {
              role = "STUDENT";
            }}
          >
            a Student
          </button>
        </div>
        <p class=" mb-1 mt-7 flex justify-center text-xl font-bold">
          Your school is...
        </p>
        <p class="mb-2 flex justify-center text-base font-medium">
          Enter your DepEd School id.
        </p>
        <input
          type="text"
          name="schoolId"
          placeholder="School ID"
          class="flex w-full items-center justify-center rounded-md border border-gray-300 p-2 shadow"
        />
        <br />
        <div class="mt-5 flex justify-center">
          <button
            type="submit"
            class="rounded-md bg-log-in-green px-4 py-2 font-semibold text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
          >
            Check School
          </button>
        </div>
      </form>
    {/if}
  </div>
</div>
