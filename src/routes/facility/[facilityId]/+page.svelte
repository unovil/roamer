<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { Button, Tooltip } from "flowbite-svelte";

  export let data: PageData;

  const blockedDates = Array.isArray(data.facility.blockedDates)
    ? data.facility.blockedDates
    : [];
  const admins = Array.isArray(data.facility.admins)
    ? data.facility.admins
    : [];
</script>

<svelte:head>
  <title>Roamer | Facility | {data.facility.name}</title>
</svelte:head>

<div class="mx-4 my-10 max-w-screen-lg sm:mx-16 md:mx-32 lg:mx-64">
  <div class="relative">
    <div class="flex flex-col items-center sm:flex-row">
      <img
        src={`/${data.facility.image}`}
        alt=""
        class="mb-3 mr-2 w-full rounded-lg sm:h-32 sm:w-32 md:h-36 md:w-36"
      />
      <div class="flex flex-col items-start sm:flex-col sm:items-start">
        <div>
          <h1
            class="text-2xl font-bold text-log-in-green sm:text-3xl md:text-4xl"
          >
            {data.facility.name}
          </h1>
          <div class="flex flex-col items-start">
            {#each admins as admin (admin.id)}
              <p
                class="mt-4 text-sm font-semibold sm:mt-0 sm:text-base md:text-lg"
              >
                {admin.user.firstName + " " + admin.user.lastName}
                <i> ({admin.user.email})</i>
              </p>
            {/each}
          </div>
        </div>
      </div>
      <div class="mt-4 sm:absolute sm:right-10 sm:mt-0">
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
            >Administrators cannot roam for facilities.</Tooltip
          >
        {/if}
      </div>
    </div>
  </div>
</div>

{#if data.isBookSuccess}
  <p
    class="flex justify-center text-xl font-bold text-green-500 sm:text-2xl md:text-3xl"
  >
    Booking success!
  </p>
{/if}

<div
  class="mx-4 mt-12 rounded-md border border-gray-300 p-4 sm:mx-8 md:mx-16 lg:mx-32"
>
  <table class="sm:2/4 h-auto w-3/4">
    <tr>
      <td class="w-full align-top sm:w-3/4 md:w-2/3">
        <h1 class="text-lg font-bold text-log-in-green sm:text-3xl md:text-4xl">
          Blocked Dates
        </h1>
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
        <h1 class="text-xl font-bold text-log-in-green sm:text-3xl md:text-4xl">
          Description
        </h1>
        <hr class="my-2 w-full" />
        <p>{data.facility.description}</p>
      </td>
    </tr>
  </table>
</div>
