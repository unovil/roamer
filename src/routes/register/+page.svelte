<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  export let form: ActionData;
  let isHidden = true;
  console.log(`form is ${form}`);

  const changePasswordVisibility = () => {
    if (isHidden == true) isHidden = false;
    else isHidden = true;
  }
  // used for conditional css, if needed.
  /* form?.invalidEmail
    form?.invalidFirstName
    form?.invalidLastName
    form?.invalidPass */
</script>


{#if form?.error}
  <p>{form.error}</p>
{/if}

<div class="flex h-screen items-center justify-center bg-gray-100">
  <div class="bg-white rounded-lg p-6 shadow-md text-center font-sans-serif">
    <h2
      class="text-lg font-semi-bold mb-6 flex items-center justify-center font-trocchi text-log-in-green transform scale-150"
    >
      <img src="/logo.png" alt="Logo" class="h-8 mr-2" />
      Roamer
    </h2>

    <form method="post">
      <input
        type="email"
        placeholder="Email address"
        name="email"
        class="block border border-gray-300 rounded-md w-full p-2 mb-2 shadow"
      />
      
      <input 
      type="first name" 
      placeholder="First Name" 
      name="first name" 
      class="block border border-gray-300 rounded-md w-full p-2 mb-2 shadow" />

      <input type="last name" placeholder="Last Name" name="last name" class="block border border-gray-300 rounded-md w-full p-2 mb-2 shadow" />
      <div class="relative">
        <input
          type={isHidden ? "password" : "text"}
          placeholder="Password"
          name="password"
          class="block border border-gray-300 rounded-md w-full p-2 mb-2 shadow"
          id="password"
        />
        <button
          type="button"
          on:click={changePasswordVisibility}
          class="absolute inset-y-0 right-0 px-3 py-2 bg-gray-200 text-gray-600 rounded-md"
          >{isHidden ? "Show" : "Hide"}</button
        >
      </div>
      <div class="flex items-center justify-start mb-2">
      </div>
      <button type="submit" class="bg-log-in-green text-white rounded-md px-4 py-2 shadow hover:bg-green-500 transition duration-300 ease-in-out">Register</button>
    </form>
    <div class="mt-5">Registered already? <a href="/login" class="text-green-500 mt-1 hover:text-log-in-green">Sign in here.</a></div>

  </div>
</div>



