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

<div class="grid grid-cols-3 grid-rows-4 h-screen text-center" style="grid-template-columns: 25% 50% 25%;">
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col items-center justify-center">
    
{#if roleSelected == "student"}
  <form action="?/roleNext" method="post" use:enhance>
    <label for="lrn" class=" mb-2 mt-1 text-lg font-medium">Type your LRN.</label> <br />
    <input 
    type="text" 
    name="lrn" 
    placeholder="LRN"
    class="block border border-gray-300 rounded-md w-full p-2 shadow" />

    <br />

    <label for="section" class=" mb-2 mt-1 text-lg font-medium" >What's your section?</label> <br />
    <div class="relative border border-gray-400 rounded-md underflow-hidden">
    <select name="section" placeholder="Section" class="block w-full px-4 py-2 appearance-none focus:outline">
      <option value="" disabled selected >Section</option>
      {#each sections as section (section.id)}
        <option value={section.id}>{section.grade} - {section.name}</option>
      {/each}
    </select>
  </div>

    <br />
    <button type="submit" class="text-black text-4xl
     hover:text-green-500 transition duration-300 ease-in-out font-semibold">
      Complete registration </button>
  </form>

{:else if roleSelected == "admin"}
  <form action="?/redirectDashboard" method="post" use:enhance>

    <button type="submit" class="text-black text-lg
     hover:text-green-500 transition duration-300 ease-in-out font-semibold">
      Complete registration </button>
  </form>
{/if}

</div>
</div>