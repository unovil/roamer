<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<form on:submit|preventDefault={() => {
  goto(`${$page.url}/booking`);
}}>
<button type="submit">Book here!</button>

</form>

Name
<h1>{data.equipment.name}</h1>
<br>

Admins
{#each data.equipment.admins as admin (admin.id)}
<p>{admin.user.firstName + " " + admin.user.lastName} <i>({admin.user.email})</i></p>
{/each}
<br>

Department
<p>{data.equipment.department}</p>
<br>

Description
<p>{data.equipment.description}</p>
<br>

Image
<img src={`/${data.equipment.image}`} alt="">