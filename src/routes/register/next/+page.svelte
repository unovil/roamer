<script lang="ts">
  import type { ActionData } from "./$types";
  import Role from "./Role.svelte";
  import RoleNext from "./RoleNext.svelte";
  export let form: ActionData;
</script>

<Role {form}>
  <p>
    {#if form?.error}
      {form?.error}
    {/if}
  </p>
</Role>

{#if typeof form?.error === "undefined" && form?.response}
  <br />

  <RoleNext
    roleSelected={form?.response.role ?? "student"}
    sections={form?.response?.sections}
  ></RoleNext>
{/if}
