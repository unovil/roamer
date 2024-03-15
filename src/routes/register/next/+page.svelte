<script lang="ts">
  import type { ActionData } from "./$types";
  import Role from "./Role.svelte";
  export let form: ActionData;
</script>

<Role {form}>
  <p>
    {#if form?.error}
      {form?.error}
    {/if}
  </p>
</Role>
