<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  export let form: ActionData;
  console.log(`form is ${form}`);

  // used for conditional css, if needed.
  /* form?.invalidEmail
    form?.invalidFirstName
    form?.invalidLastName
    form?.invalidPass */
</script>

{#if form?.error}
  <p>{form.error}</p>
{/if}

<form method="post" use:enhance>
  <input type="email" placeholder="Email address" name="email" />
  <br />
  <input type="text" placeholder="First name" name="firstName" />
  <br />
  <input type="text" placeholder="Last name" name="lastName" />
  <br />
  <input type="password" placeholder="Password" name="password"/>
  <br />
  <button type="submit">Register</button>
</form>

<a href="/login">Registered already? Sign in here.</a>
