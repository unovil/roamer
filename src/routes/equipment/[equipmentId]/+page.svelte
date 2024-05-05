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

<div class="mx-64 my-10 max-w-screen-lg">
  <div class="relative">
    <div class="flex items-center">
      <img
        src={`/${data.equipment.image}`}
        alt=""
        class="mr-5 h-48 w-48 rounded-lg"
      />
      <div>
        <h1 class="text-4xl font-bold text-log-in-green">
          {data.equipment.name}
        </h1>
        {#each admins as admin (admin.id)}
          <p class="text-lg font-semibold">
            {admin.user.firstName + " " + admin.user.lastName}
            <i>({admin.user.email})</i>
          </p>
        {/each}
        <p class="text-lg font-semibold">{data.equipment.department}</p>
      </div>
      <br />

      <div class="absolute right-10">
        <Button
          color="green"
          pill
          size="xl"
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
    <table class="h-auto w-3/4">
      <tr>
        <td class="align-top">
          <h1 class="text-3xl font-bold text-log-in-green">Blocked Dates</h1>
          <hr class="my-2 w-full" />
          {#each blockedDates as date}
            <p>
              {new Date(date.start).toLocaleString()} - {new Date(
                date.end,
              ).toLocaleString()}
            </p>
          {/each}
        </td>
        <td class="align-top">
          <h1 class="text-3xl font-bold text-log-in-green">Description</h1>
          <hr class="my-2 w-full" />
          <p>{data.equipment.description}</p>
        </td>
      </tr>
    </table>
  </div>
</div>
