<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let form: ActionData;
  export let error: string | undefined;
  export let roleSelected: string;
  export let school: string;
  export let sections: {
    id: number;
    grade: number;
    name: string;
    schoolId: number;
  }[];
</script>

<div class="flex h-screen items-center justify-center bg-gray-100">
  {#if roleSelected == "STUDENT"}
  <div
  class="mx-auto h-96 w-full sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-lg bg-white bg-opacity-80 p-6 shadow-lg"
>
      {#if error}
        <p class="flex justify-center font-medium text-red-600">{error}</p>
      {/if}
      <p class="text-center font-semibold text-lg mt-2">You're a part of: <strong>{school}</strong></p>
      <form
        action="?/roleNext"
        method="post"
        use:enhance
        class="flex flex-col items-center"
      >
        <label for="lrn" class="mt-5  mb-2 text-xl font-bold text-log-in-green"
          >What is your LRN?</label
        >
        <input
          type="text"
          name="lrn"
          placeholder="LRN"
          class="mb-2 block w-3/4 rounded-md border border-gray-300 p-2 shadow"
        />

        <br />

        <label for="section" class=" mb-2 text-xl font-bold text-log-in-green"
          >What section are you a part of?</label
        >
        <select
          name="section"
          placeholder="Section"
          class="mb-2 block w-3/4 rounded-md border border-gray-300 p-2 shadow"
        >
          <option value="" disabled selected>Select a section</option>
          {#each sections as section (section.id)}
            <option value={section.id}>{section.grade} - {section.name}</option>
          {/each}
        </select>

        <br />
        <div>
          <button
            type="submit"
            class="rounded-md bg-log-in-green px-4 py-2 text-base font-bold text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
          >
            Continue to dashboard >
          </button>
      </form>
    </div>
  {:else if roleSelected == "ADMIN"}
    <a
      href="/admindashboard"
      class="mt-5 rounded-md bg-log-in-green px-4 py-2 text-3xl font-bold text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
    >
      <p class="text-center">You're a part of: <strong>{school}</strong></p>
      Continue to dashboard >
    </a>
  {/if}
</div>
