<script lang="ts">
  import type { PageData } from "./$types";
  import { Table, Button } from "flowbite-svelte";
  export let data: PageData;
</script>

<div
  class="flex h-full w-full flex-col items-center p-4 text-center"
>
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex h-full flex-col">
    <main>
      <p class="mb-20 text-6xl font-semibold">
        Welcome, <strong>{data.userInfo.firstName}!</strong>
      </p>
    </main>
  </div>

  <div class="flex justify-between">
    <div
      class="ml-40 flex w-1/2 flex-col justify-between rounded-lg border-2 border-gray-300 p-4"
    >
      <Table>
        <caption
          class=" mb-5 text-center text-3xl font-bold text-gray-900 dark:text-white"
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
                <img src={facility.image} class="h-32 " alt={facility.name} />
              </td>
            </tr>
          {/each}
        {/if}
      </Table>
      <Button color="green" pill class="mt-5">
        <a href="/facility/add">Add more facilities ></a>
      </Button>
    </div>

    <style>
      :global(h2 + table) {
        margin-top: 0;
      }
    </style>

    <div
      class="ml-6 mr-40 flex w-1/2 flex-col justify-between rounded-lg border-2 border-gray-300 p-4"
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
      <Button color="green" pill class="mt-5">
        <a href="/equipment/add">Add more equipment ></a>
      </Button>
    </div>
  </div>
</div>
