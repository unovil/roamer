<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  const blockedDates = Array.isArray(data.facility.blockedDates)
    ? data.facility.blockedDates
    : [];
  const admins = Array.isArray(data.facility.admins)
    ? data.facility.admins
    : [];
</script>

<a href={`${$page.url}/booking`}>Book now</a>
<br />

{#if data.isBookSuccess}
  <p>Booking success!</p>
{/if}

<br />

Name
<h1>{data.facility.name}</h1>
<br />

Blocked Dates
{#each blockedDates as date}
  <p>
    {new Date(date.start).toLocaleString()} - {new Date(
      date.end,
    ).toLocaleString()}
  </p>
{/each}
<br />
<br />

Admins
{#each admins as admin (admin.id)}
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
