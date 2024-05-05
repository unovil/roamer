<script lang="ts">
  import type { ActionData } from "./$types";
  import Role from "./Role.svelte";
  import RoleNext from "./RoleNext.svelte";
  export let form: ActionData;

  let roleSuccess: boolean = false;
  let roleSelected: string;
  let schoolName: string;
  let sections:
    | {
        id: number;
        grade: number;
        name: string;
        schoolId: number;
      }[]
    | undefined;
  $: if (form?.response) {
    roleSuccess = true;
    roleSelected = form?.response.role;
    schoolName = form?.response.schoolName;
    sections = form?.response.sections;

    sections.sort((a, b) => {
      if (a.grade === b.grade) {
        return a.name.localeCompare(b.name);
      } else {
        return a.grade - b.grade;
      }
    });

    // to trigger reactivity
    sections = sections;
  }
</script>

<svelte:head>
  <title>Roamer | Register</title>
</svelte:head>

{#if !roleSuccess}
  <Role {form} error={form?.error} />
{:else}
  <p>Role picked: {roleSelected}</p>
  <p>School found: {schoolName}</p>
{/if}

{#if roleSuccess}
  <br />
  <RoleNext
    roleSelected={roleSelected ?? "student"}
    sections={sections ?? []}
    error={form?.error}
  />
{/if}
