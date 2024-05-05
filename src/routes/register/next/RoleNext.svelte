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

<div class="flex items-center justify-center h-screen scroll-smooth w-screen bg-gradient-to-l from-green-200 via-green-300 to-green-400">
  
    {#if roleSelected == "STUDENT"}
    <div class="p-6 bg-white shadow-lg rounded-lg w-2/5 h-3/5 mx-auto">
      {#if error}
    <p class = "flex justify-center text-red-600 font-medium">{error}</p>
  {/if}
      <form action="?/roleNext" method="post" use:enhance class="flex flex-col items-center">
        <label for="lrn" class="font-bold text-4xl text-log-in-green mt-5">What is your LRN?</label>
        <br />
        <input type="text" name="lrn" placeholder="LRN" class = "w-96 rounded-md border shadow-gray-600"/>

        <br />

      <label for="section" class="font-bold text-4xl text-log-in-green">What section are you a part of?</label>
      <br />
      <select name="section" placeholder="Section" class = "w-96 rounded-md border shadow-gray-600">
        <option value="" disabled selected>Select a section</option>
        {#each sections as section (section.id)}
          <option value={section.id}>{section.grade} - {section.name}</option>
        {/each}
      </select>

      <br />
      <button type="submit" class="mt-5 rounded-md bg-log-in-green px-4 py-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500">Complete registration > </button>
    </form>
  </div>
    {:else if roleSelected == "ADMIN"}
    <form action="?/redirectDashboard" method="post" use:enhance class="flex items-center justify-center h-80">
      <button type="submit" class=" text-3xl font-bold mt-5 rounded-md bg-log-in-green px-4 py-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500">Continue to dashboard ></button>
    </form>
  {/if}
</div>