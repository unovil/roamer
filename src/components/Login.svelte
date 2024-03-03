<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "../routes/authenticate/$types";
  export let form: ActionData;
  export let action: string;
  console.log(`form is ${form}`);
</script>

{#if form?.error}
  <p>{form.error}</p>
{/if}

<form method="post" {action} use:enhance>
  <input
    type="email"
    placeholder="Email address"
    name="email"
    value={form?.description ?? ""}
  />
  <br />
  <input type="password" placeholder="Password" name="password" />
  <br />
  <button type="submit">Login</button>
</form>
