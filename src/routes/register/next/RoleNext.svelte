<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let form: ActionData;
  export let roleSelected: string;
  export let sections: {
    id: number;
    grade: number;
    name: string;
    schoolId: number;
  }[];
</script>

<div class="flex h-screen items-center justify-center bg-gray-100">
  <div
    class="bg-white rounded-lg p-6 shadow-md text-center font-sans-serif w-80"
  >
    <h2
      class="text-lg font-semi-bold mb-6 flex items-center justify-center font-trocchi text-log-in-green transform scale-150"
    >
      <img src="/logo.png" alt="Logo" class="h-8 mr-2" />
      Roamer
    </h2>

{#if roleSelected == "student"}
  <form action="?/roleNext" method="post" use:enhance>
    <label for="lrn" class=" mb-2 mt-1 text-lg font-medium">What is your LRN?</label> <br />
    <input 
    type="text" 
    name="lrn" 
    placeholder="LRN"
    class="block border border-gray-300 rounded-md w-full p-2 shadow" />

    <br />

    <label for="section" class=" mb-2 mt-1 text-lg font-medium" >What section are you a part of?</label> <br />
    <div class="relative border border-gray-400 rounded-md underflow-hidden">
    <select name="section" placeholder="Section" class="block w-full px-4 py-2 appearance-none focus:outline-none">
      <option value="" disabled selected >Select a section</option>
      {#each sections as section (section.id)}
        <option value={section.id}>{section.grade} - {section.name}</option>
      {/each}
    </select>
  </div>

    <br />
    <button type="submit" class="bg-log-in-green text-white rounded-md px-4 py-2 shadow
     hover:bg-green-500 transition duration-300 ease-in-out font-semibold">
      Submit registration</button>
  </form>

{:else if roleSelected == "admin"}
  <form action="?/redirectDashboard" method="post" use:enhance>
    <button type="submit">Continue to dashboard.</button>
  </form>
{/if}

</div>
</div>