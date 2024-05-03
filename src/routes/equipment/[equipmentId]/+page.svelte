<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { Button, Tooltip } from "flowbite-svelte";

  export let data: PageData;

  const blockedDates = Array.isArray(data.equipment.blockedDates)
    ? data.equipment.blockedDates
    : [];
  const admins = Array.isArray(data.equipment.admins)
    ? data.equipment.admins
    : [];
</script>

<svelte:head>
  <title>Roamer | Equipment | {data.equipment.name}</title>
</svelte:head>

{#if data.isBookSuccess}
  <p class="flex justify-center text-3xl font-semibold text-green-500">
    Booking success!
  </p>
{/if}

<div class="mx-96 my-6 max-w-screen-lg">
  <div class="relative">
    <div class="flex items-center">
      <img src={`/${data.equipment.image}`} alt="" class="mr-5 h-48 w-48" />
      <div>
        <p class="text-lg font-bold text-log-in-green">NAME:</p>
        <h1>{data.equipment.name}</h1>
        <br />

        <p class="text-lg font-bold text-log-in-green">ADMINS:</p>
        {#each admins as admin (admin.id)}
          <p>
            {admin.user.firstName + " " + admin.user.lastName}
            <i>({admin.user.email})</i>
          </p>
        {/each}
        <br />

        <p class="text-lg font-bold text-log-in-green">DEPARTMENT:</p>
        <p>{data.equipment.department}</p>
      </div>
      <br />

      <div class="absolute right-10 top-0">
        <Button
          color="green"
          pill
          size="lg"
          href={`${$page.url}/booking`}
          disabled={data.user.admin ? true : false}
        >
          Roam
        </Button>
        {#if data.user.admin}
          <Tooltip placement="bottom"
            >Administrators cannot roam for equipment.</Tooltip
          >
        {/if}
      </div>
    </div>
  </div>

  <div class="mt-12 rounded-md border border-gray-300 p-4">
    <table class="h-screen w-3/4">
      <tr>
        <td class="align-top">
          <h1 class="text-2xl font-bold text-log-in-green">Blocked Dates:</h1>
          {#each blockedDates as date}
            <p>
              {new Date(date.start).toLocaleString()} - {new Date(
                date.end,
              ).toLocaleString()}
            </p>
          {/each}
        </td>
        <td class="align-top">
          <h1 class="text-2xl font-bold text-log-in-green">Description:</h1>
          <p>{data.equipment.description}</p>
        </td>
      </tr>
    </table>
  </div>
</div>
