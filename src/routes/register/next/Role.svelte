<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  export let form: ActionData;
  let userRoles = ["admin", "student"];
</script>

{#if !(typeof form?.error == "undefined" && form?.response.schoolName && form?.response.sections.length != 0)}
  <form method="post" action="?/role" use:enhance>
    <p>You are a/an...</p>
    {#each userRoles as userRole}
      <input type="radio" value={userRole} name="role" />
      <label for={userRole}>{userRole}</label>
      <br />
    {/each}

    <p>What school are you a part of? Type its DepEd school ID.</p>
    <input type="text" name="schoolId" placeholder="School" />
    <br />
    <button type="submit">Check</button>
  </form>
{/if}
