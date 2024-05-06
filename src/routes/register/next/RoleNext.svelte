<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let form: ActionData;
  export let error: string | undefined;
  export let roleSelected: string;
  export let sections: {
    id: number;
    grade: number;
    name: string;
    schoolId: number;
  }[];
</script>

<div
  class="flex h-screen w-screen items-center justify-center scroll-smooth bg-gradient-to-l from-green-200 via-green-300 to-green-400"
>
  {#if roleSelected == "STUDENT"}
    <div
      class="mx-auto h-3/5 w-2/5 rounded-lg bg-white bg-opacity-70 p-6 shadow-lg"
    >
      {#if error}
        <p class="flex justify-center font-medium text-red-600">{error}</p>
      {/if}
      <form
        action="?/roleNext"
        method="post"
        use:enhance
        class="flex flex-col items-center"
      >
        <label for="lrn" class="mt-5 text-4xl font-bold text-log-in-green"
          >What is your LRN?</label
        >
        <br />
        <input
          type="text"
          name="lrn"
          placeholder="LRN"
          class="w-96 rounded-md border shadow-gray-600"
        />

        <br />

        <label for="section" class="text-4xl font-bold text-log-in-green"
          >What section are you a part of?</label
        >
        <br />
        <select
          name="section"
          placeholder="Section"
          class="w-96 rounded-md border shadow-gray-600"
        >
          <option value="" disabled selected>Select a section</option>
          {#each sections as section (section.id)}
            <option value={section.id}>{section.grade} - {section.name}</option>
          {/each}
        </select>

        <br />
        <button
          type="submit"
          class="mt-5 rounded-md bg-log-in-green px-4 py-2 text-3xl font-bold text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
          >Continue to dashboard >
        </button>
      </form>
    </div>
  {:else if roleSelected == "ADMIN"}
    <a
      href="/admindashboard"
      class="mt-5 rounded-md bg-log-in-green px-4 py-2 text-3xl font-bold text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
    >
      Continue to dashboard >
    </a>
  {/if}
</div>
