<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<form on:submit|preventDefault={() => {
  goto(`${$page.url}/booking`);
}}>
  <button type="submit">Book now!</button>
</form>
<br />

Name
<h1>{data.facility.name}</h1>
<br />

Admins
{#each data.facility.admins as admin (admin.id)}
  <p>
    {admin.user.firstName + " " + admin.user.lastName}
    <i>({admin.user.email})</i>
  </p>
{/each}
<br />

Department
<p>{data.facility.department}</p>
<br />

Description
<p>{data.facility.description}</p>
<br />

Image
<img src={`/${data.facility.image}`} alt="" />
