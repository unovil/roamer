<script lang="ts">
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { Table, Button } from "flowbite-svelte";
  export let data: PageData;

  let searchTerm: string | null = null;
  let searchCategory: string;
</script>

<svelte:head>
  <title>Roamer | Dashboard</title>
</svelte:head>

<div
  class="sm:textc-center mt-10 flex flex-col items-center px-4 text-center sm:px-8 md:px-16 lg:px-32"
>
  <h1 class="text-4xl font-semibold sm:text-5xl md:text-6xl">
    Welcome, <strong>{data.userInfo.firstName}</strong>!
  </h1>
  <h1
    class="mb-4 mt-3 text-base font-semibold sm:text-xl md:text-2xl lg:text-4xl"
  >
    Looking for something to roam about?
  </h1>

  <form
    on:submit|preventDefault={() => {
      const { query, term } = searchQuery(searchTerm, searchCategory, $page);
      searchTerm = term;
      if (query != "") goto(`/search?${query}`);
    }}
  >
    <div class="flex w-full justify-between">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search..."
        class="mb-2 mr-2 w-full flex-grow rounded-md border border-gray-300 p-2 shadow"
      />
      <select
        name="searchCategory"
        bind:value={searchCategory}
        class="mb-2 mr-2 flex rounded-md border border-gray-300 p-2 shadow"
      >
        <option value="facility">Facility</option>
        <option value="equipment">Equipment</option>
      </select>
      <input
        type="submit"
        value="Search"
        class="mb-2 flex rounded-md border border-gray-300 bg-log-in-green p-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
      />
    </div>
  </form>
</div>

<div class="mx-4 my-8 flex flex-col justify-between sm:mx-32 sm:flex-row">
  <div
    class="mb-4 w-full rounded-md border border-gray-300 p-4 shadow sm:mb-0 sm:mr-2 sm:w-3/4"
  >
    <Table>
      <caption
        class=" mb-5 text-center text-3xl font-bold text-gray-900 dark:text-white"
        style="caption-side:top"
      >
        Facilities you manage:
      </caption>

      <tr>
        <th class="w-1/4">Facility</th>
        <th class="w-1/4">Owned by</th>
        <th class="mr-4 w-9">Department</th>
        <th class="w-1/4">Image</th>
      </tr>
      {#if data?.facilities && data?.facilities.length > 0}
        {#each data?.facilities as facility (facility.id)}
          <tr>
            <td class="w-1/4">{facility.name}</td>
            <td class="w-1/4">
              {facility.admins
                .map(
                  (admin) => `${admin.user.firstName} ${admin.user.lastName}`,
                )
                .join(", ")}
            </td>
            <td class="w-1/4">{facility.department}</td>
            <td>
              <img src={facility.image} class="h-32" alt={facility.name} />
            </td>
          </tr>
        {/each}
      {/if}
    </Table>
    <Button color="green" pill class="mt-5 w-full" href="/facility/add">
      Add more facilities {">"}
    </Button>
  </div>

  <div
    class="mt-4 w-full rounded-md border border-gray-300 p-4 shadow sm:ml-2 sm:mt-0 sm:w-3/4"
  >
    <Table>
      <caption
        class=" mb-5 text-center text-3xl font-bold text-gray-900 dark:text-white"
      >
        Equipments you manage:
      </caption>
      <tr>
        <th>Equipment</th>
        <th>Owned by</th>
        <th>Department</th>
        <th>Image</th>
      </tr>
      {#if data?.equipments && data?.equipments.length > 0}
        {#each data?.equipments as equipment (equipment.id)}
          <tr>
            <td class="w-1/4">{equipment.name}</td>
            <td class="w-1/4">
              {equipment.admins
                .map(
                  (admin) => `${admin.user.firstName} ${admin.user.lastName}`,
                )
                .join(", ")}
            </td>
            <td class="w-1/4">{equipment.department}</td>
            <td>
              <img src={equipment.image} class="h-32" alt={equipment.name} />
            </td>
          </tr>
        {/each}
      {/if}
    </Table>
    <Button color="green" pill class="mt-5 w-full" href="/equipment/add">
      Add more equipment {">"}
    </Button>
  </div>
</div>
