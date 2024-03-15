<script lang="ts">
  import type { ActionData } from "./$types";

  let form: ActionData;
  export let roleSelected: string;
  export let sections: {
    id: number;
    grade: number;
    name: string;
    schoolId: number;
  }[];
</script>

{#if roleSelected == "student"}
  <label for="lrn">What is your LRN?</label> <br />
  <input type="text" name="lrn" placeholder="LRN" />

  <br />

  <label for="section">What section are you a part of?</label> <br />
  <select name="section" placeholder="Section">
    <option value="" disabled selected>Select a section</option>
    {#each sections as section (section.id)}
        <option value={section.id}>{section.grade} - {section.name}</option>
    {/each}
  </select>
{/if}
