<script lang="ts">
  import type { ActionData } from "./$types";
  import {enhance} from "$app/forms";
  export let form: ActionData;
  console.log(`form is ${form}`);

  // conditional css, if needed
  /* form?.invalidEmail
  form?.invalidUser
  form?.invalidPass
  form?.incorrectPass
  form?.duplicateUser */
</script>

{#if form?.error}
  <p>{form.error}</p>
{/if}

<div class="flex h-screen items-center justify-center bg-gray-100">
  <div class="bg-white rounded-lg p-6 shadow-md text-center font-alatsi">
    <h2 class="text-lg font-semi-bold mb-6 flex items-center justify-center font-trocchi text-log-in-green transform scale-150">
      <img src="/logo.png" alt="Logo" class="h-8 mr-2">
      Roamer
    </h2>
    
    <form method="post">
      <input
        type="email"
        placeholder="Email address"
        name="email"
        class="block border border-gray-300 rounded-md w-full p-2 mb-2 shadow"
      />
      <div class="relative">
        <input type="password" placeholder="Password" name="password" class="block border border-gray-300 rounded-md w-full p-2 mb-2 shadow" id="password" />
        <button type="button" on:click={()=>{}} class="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 text-gray-600 rounded-md">Show</button>
      </div>
      <button type="submit" class="bg-log-in-green text-white rounded-md px-4 py-2 shadow hover:bg-green-500 transition duration-300 ease-in-out mt-5">Login</button>
    </form>
    <div class="mt-5">Not a user yet? <a href="/register" class="text-green-500 mt-1 hover:text-log-in-green">Register here.</a></div>
  </div>
</div>