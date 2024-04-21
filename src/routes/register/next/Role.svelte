<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  export let form: ActionData;
  let userRoles = ["admin", "student"];
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



{#if !(typeof form?.error == "undefined" && form?.response.schoolName && form?.response.sections.length != 0)}
  <form method="post" action="?/role" use:enhance>
    <p class="mb-4 text-lg font-semibold">
      You are a/an...</p>

      <div class="relative flex items-center justify-center w-30 h-10 border border-gray-400 rounded-md hover:bg-green-500">
      <input type="radio" value="admin" name="role"/>
      <label for="admin" class = "m-2">I am an Admin</label>
    </div> <br>
    <div class="relative flex items-center justify-center w-30 h-10 border border-gray-400 rounded-md hover:bg-green-500">
      <input type="radio" value="student" name="role" />
      <label for="student" class = "m-2">I am a Student</label>
    </div> 

    <p class=" mb-2 mt-1 text-lg font-medium">Enter your DepEd School ID here.</p>
    <input type="text" 
    name="schoolId" 
    placeholder="School ID" 
    class="block border border-gray-300 rounded-md w-full p-2 shadow"
    />
    <br />
    <button type="submit" class="bg-log-in-green text-white rounded-md px-4 py-2 shadow hover:bg-green-500 transition duration-300 ease-in-out">Check</button>
  </form>
{/if}
</div>
</div>