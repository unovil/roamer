<script lang="ts">
  import type { PageData } from "./$types";
  import { Table } from 'flowbite-svelte';
  export let data: PageData;
</script>

<div class="flex h-full w-full flex-col items-center bg-white p-4 text-center">
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col h-full">
    <main>
      <p class="text-6xl font-semibold mb-20">
        Welcome, <strong>{data.userInfo.firstName}!</strong>
      </p>
    </div>

<div class = " flex justify-between">
<div class="border-2 border-gray-300 p-4 rounded-lg mr-10 ml-10">
  <Table>
    <p>List of facilities you have:</p>
      <tr>
        <th class="w-1/4">Facility</th>
        <th class="w-1/4">Owned by</th>
        <th class="w-9 mr-4">Department</th>
        <th class="w-1/4">Image</th>
      </tr>
      {#if data?.facilities && data?.facilities.length > 0}
        {#each data?.facilities as facility (facility.id)}
          <tr>
            <td class="w-1/4">{facility.name}</td>
            <td class="w-1/4">
              {facility.admins
                .map((admin) => `${admin.user.firstName} ${admin.user.lastName}`)
                .join(", ")}
            </td>
            <td class="w-1/4">{facility.department}</td>
          <td><img src={facility.image} class="h-32" alt={facility.name} /></td>
        </tr>
      {/each}
    {/if}
</Table>
</div>


<div class="border-2 border-gray-300 p-4 rounded-lg mr-10">
 
    <Table>
      <p>List of facilities you have:</p>
        <tr>
          <th class="w-1/4">Facility</th>
          <th class="w-1/4">Owned by</th>
          <th class="w-9 mr-4">Department</th>
          <th class="w-1/4">Image</th>
        </tr>
        {#if data?.facilities && data?.facilities.length > 0}
          {#each data?.facilities as facility (facility.id)}
            <tr>
              <td class="w-1/4">{facility.name}</td>
              <td class="w-1/4">
                {facility.admins
                  .map((admin) => `${admin.user.firstName} ${admin.user.lastName}`)
                  .join(", ")}
              </td>
              <td class="w-1/4">{facility.department}</td>
            <td><img src={facility.image} class="h-32" alt={facility.name} /></td>
          </tr>
        {/each}
      {/if}
  </Table>
  </div>
</div>
</div>