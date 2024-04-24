<script lang="ts">
  import { enhance } from "$app/forms";
  import Page from "../+page.svelte";
  import type { ActionData } from "./$types";
  export let form: ActionData;
  export let error: string | undefined;

  let role: "ADMIN" | "STUDENT" | null = null;
</script>

<div class="grid grid-cols-3 grid-rows-4 h-screen text-center" style="grid-template-columns: 25% 50% 25%;">
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col items-center justify-center">
    <h2 class="text-4xl font-semi-bold mb-6 flex items-center justify-center font-trocchi text-log-in-green transform scale-150">
      Welcome to Roamer <img src="/logo.png" alt="Logo" class="h-8 mr-2 ml-2" />!   </h2>
    <p class="text-xl font-medium mt-1">Before continuing, we just need you to answer these.</p>

    {#if error}
      <p class="text-red-600 whitespace-normal font-bold mb-2 mt-2">{error}</p>
    {/if}

    {#if !(typeof form?.error == "undefined" && form?.response.schoolName && form?.response.sections.length != 0)}
      <form method="post" action="?/role" use:enhance={({ formData })=> {
        // construct an append formdata with the name of role, and the value being
        // either student or admin based on the user's input, also add validation.
        formData.append("role", role || "");

        return async ({ update }) => {
          await update();
        };
      }}>
        <p class="mt-5 mb-4 text-2xl font-bold">You are...</p>

        <button 
          type="button"
          class="items-center justify-center w-40 h-10 border border-gray-400 rounded-md {role == "ADMIN"? 'bg-green-700' : 'hover:bg-green-500'} mb-1"
          on:click={()=>{role = "ADMIN";}}>
          an Admin
        </button>

        <button 
          type="button"
          class="items-center justify-center w-40 h-10 ml-6 border border-gray-400 rounded-md {role == "STUDENT" ? 'bg-green-700' : 'hover:bg-green-500'}"
          on:click={()=>{role = "STUDENT";}}>
          a Student
        </button>

        <p class=" mb-1 mt-3 text-2xl font-bold">
            Your school is...
        </p>
        <p class= "mb-2 text-base font-medium">
          Enter your DepEd School id.
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
          >Check School</button
        >
      </form>
    {/if}
  </div>
</div>