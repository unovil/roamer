<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  export let form: ActionData;
  export let error: string | undefined;

  let roleSelect = {
    isAdmin: false,
    isStudent: false
  }

  $: console.log(roleSelect)
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

    {#if error}
      <p>{error}</p>
    {/if}

    {#if !(typeof form?.error == "undefined" && form?.response.schoolName && form?.response.sections.length != 0)}
      <form method="post" action="?/role" use:enhance={({ formData })=> {
        // construct an append formdata with the name of role, and the value being
        // either student or admin based on the user's input, also add validation.
        if (roleSelect.isAdmin){
          formData.append("role", "admin");
        } else if(roleSelect.isStudent){
          formData.append("role", "student");
        } else {
          formData.append("role", "");
        }

        return async ({ update }) => {
          await update();
        };
      }}>
        <p class="mb-4 text-lg font-semibold">I am...</p>

        <button 
          type="button"
          class="relative flex items-center justify-center w-full h-10 border border-gray-400 rounded-md {roleSelect.isAdmin ? 'bg-green-700' : 'hover:bg-green-500'} mb-1"
          on:click={()=>{roleSelect.isAdmin = true; roleSelect.isStudent = false;}}>
          an Admin
        </button>

        <button 
          type="button"
          class="relative flex items-center justify-center w-full h-10 border border-gray-400 rounded-md {roleSelect.isStudent ? 'bg-green-700' : 'hover:bg-green-500'}"
          on:click={()=>{roleSelect.isStudent = true; roleSelect.isAdmin = false;}}>
          a Student
        </button>

        <p class=" mb-2 mt-1 text-lg font-medium">
          Enter your DepEd School ID here.
        </p>
        <input
          type="text"
          name="schoolId"
          placeholder="School ID"
          class="block border border-gray-300 rounded-md w-full p-2 shadow"
        />
        <br />
        <button
          type="submit"
          class="bg-log-in-green text-white rounded-md px-4 py-2 shadow hover:bg-green-500 transition duration-300 ease-in-out"
          >Check</button
        >
      </form>
    {/if}
  </div>
</div>
