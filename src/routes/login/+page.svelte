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

<form method="post" use:enhance>
  <input
    type="email"
    placeholder="Email address"
    name="email"
  />
  <br />
  <input type="password" placeholder="Password" name="password" />
  <br />
  <button type="submit">Login</button>
</form>

<a href="/register" class="font-semibold">Not a user yet? Register here.</a>