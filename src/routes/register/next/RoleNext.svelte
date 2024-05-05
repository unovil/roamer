<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let form: ActionData;
  export let error: string | undefined;
  export let roleSelected: string;
  export let sections: {
    id: number;
    grade: number;
    name: string;
    schoolId: number;
  }[];
</script>

{#if error}
  <p>{error}</p>
{/if}

{#if roleSelected == "STUDENT"}
  <form action="?/roleNext" method="post" use:enhance>
    <label for="lrn">What is your LRN?</label>
    <br />
    <input type="text" name="lrn" placeholder="LRN" />

    <br />

    <label for="section">What section are you a part of?</label>
    <br />
    <select name="section" placeholder="Section">
      <option value="" disabled selected>Select a section</option>
      {#each sections as section (section.id)}
        <option value={section.id}>{section.grade} - {section.name}</option>
      {/each}
    </select>

    <br />
    <button type="submit">Submit registration.</button>
  </form>
{:else if roleSelected == "ADMIN"}
  <form action="?/redirectDashboard" method="post" use:enhance>
    <button type="submit">Continue to dashboard.</button>
  </form>
{/if}
