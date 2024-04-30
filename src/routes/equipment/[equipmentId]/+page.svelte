<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  const blockedDates = Array.isArray(data.equipment.blockedDates)
    ? data.equipment.blockedDates
    : [];
  const admins = Array.isArray(data.equipment.admins)
    ? data.equipment.admins
    : [];
</script>

{#if data.isBookSuccess}
  <p>Booking success!</p>
{/if}

<br />

<div class="mx-auto max-w-screen-lg">
  <div class="flex justify-between">
    <div class="flex">
      <img class="mr-10 h-1/4 w-1/4" src={`/${data.equipment.image}`} alt="" />
      <div class="mr-30 justify-items-start">
        <h1>{data.equipment.name}</h1>
        <br />
        {#each admins as admin (admin.id)}
          <p>
            {admin.user.firstName + " " + admin.user.lastName}
            <i>({admin.user.email})</i>
          </p>
        {/each}
        DEPARTMENT:
        <p>{data.equipment.department}</p>
        <br />
      </div>
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
          <th class="px-4 py-2 text-xl font-bold">Blocked Dates</th>
          <th class="px-4 py-2 text-xl font-bold">Description</th>
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
            <td class="border px-4 py-2">{data.equipment.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
