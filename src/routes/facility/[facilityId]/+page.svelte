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

{#if data.isBookSuccess}
  <p>Booking success!</p>
{/if}

<style>
  .custom-margin {
    margin-left: 0.5rem;
  }
</style>
<br />
<div class="mx-auto max-w-screen-lg">
  <div class="flex justify-between">
    <img class="h-1/4 w-1/4" src={`/${data.facility.image}`} alt="" />
    <div class="custom-margin justify-items-start">
      <h1>{data.facility.name}</h1>
      {#each admins as admin (admin.id)}
        <p>
          {admin.user.firstName + " " + admin.user.lastName}
          <i>({admin.user.email})</i>
        </p>
        <p>{data.facility.department}</p>
        <br />
      {/each}
      <br />
    </div>

    <div class="text-right">
      <a
        href={`${$page.url}/booking`}
        class="inline-block rounded bg-log-in-green px-4 py-2 font-bold text-white hover:bg-green-500"
      >
        Roam
      </a>
    </div>
  </div>

  <div class="mt-4 max-h-screen rounded border border-gray-300 p-4">
    <table class="w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 font-bold text-xl">Blocked Dates</th>
          <th class="px-4 py-2 font-bold text-xl">Description</th>
        </tr>
      </thead>
      <tbody>
        {#each blockedDates as date}
          <tr>
            <td class="border px-4 py-2">
              {new Date(date.start).toLocaleString()} - {new Date(
                date.end,
              ).toLocaleString()}
            </td>
            <td class="border px-4 py-2">{data.facility.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
