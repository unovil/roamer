<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div
  class="grid h-screen grid-cols-3 grid-rows-4 bg-white text-center"
  style="grid-template-columns: 25% 50% 25%;"
>
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col">
    <main>
      <p class="text-7xl font-semibold">
        Welcome, <strong>{data.userInfo.firstName}</strong>
        !
      </p>
      <div class="flex justify-between mt-20">
        <div class="border border-gray-300 p-4 rounded-md shadow w-1/2 mr-2">
      <br />
      <p>List of facilities you have:</p>
      <table>
        <tr>
          <th>Facility</th>
          <th>Owned by</th>
          <th>Department</th>
          <th>Image</th>
        </tr>
        {#if data?.facilities && data?.facilities.length > 0}
          {#each data?.facilities as facility (facility.id)}
            <tr>
              <td>{facility.name}</td>
              <td>
                {facility.admins
                  .map(
                    (admin) => `${admin.user.firstName} ${admin.user.lastName}`,
                  )
                  .join(", ")}
              </td>
              <td>{facility.department}</td>
              <td>
                <img src={facility.image} class="h-32" alt={facility.name} />
              </td>
            </tr>
          {/each}
        {/if}
        <tr class="bg-green-800">
          <td></td>
          <td>
            <a href="/facility/add">Add more facilities under your purview.</a>
          </td>
          <td></td>
        </tr>
      </table>
      <br />
      <div class="border border-gray-300 p-4 rounded-md shadow w-1/2">
      <p>List of equipment you have:</p>
      <table>
        <tr>
          <th>Equipment</th>
          <th>Owned by</th>
          <th>Department</th>
          <th>Image</th>
        </tr>
      </div>
    </div>
        {#if data?.equipments && data?.equipments.length > 0}
          {#each data?.equipments as equipment (equipment.id)}
            <tr>
              <td>{equipment.name}</td>
              <td>
                {equipment.admins
                  .map(
                    (admin) => `${admin.user.firstName} ${admin.user.lastName}`,
                  )
                  .join(", ")}
              </td>
              <td>{equipment.department}</td>
              <td>
                <img src={equipment.image} class="h-32" alt={equipment.name} />
              </td>
            </tr>
          {/each}
        {/if}
        <tr class="bg-green-800">
          <td></td>
          <td>
            <a href="/equipment/add">Add more equipment under your purview.</a>
          </td>
          <td></td>
        </tr>
      </table>
    </main>
    <br />
  </div>
</div>
