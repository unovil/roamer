<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div
  class="grid h-screen grid-cols-3 grid-rows-4 bg-white text-center"
  style="grid-template-columns: 15% 70% 15%;"
>
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col">
    <main>
      <p class="text-7xl font-semibold">
        Welcome, <strong>{data.userInfo.firstName}</strong>
        !
      </p>
      <br />

      <div class="mt-20 flex flex-row justify-between">
        <div
          class="mb-4 mr-4 w-full rounded-md border border-gray-300 p-4 shadow"
        >
          <p>Facilities you manage:</p>
          <table class="w-full table-auto">
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
                        (admin) =>
                          `${admin.user.firstName} ${admin.user.lastName}`,
                      )
                      .join(", ")}
                  </td>
                  <td>{facility.department}</td>
                  <td>
                    <img
                      src={facility.image}
                      class="h-32"
                      alt={facility.name}
                    />
                  </td>
                </tr>
              {/each}
            {/if}
            <tr class="bg-green-800">
              <td></td>
              <td>
                <a href="/facility/add">
                  Add more facilities under your purview.
                </a>
              </td>
              <td></td>
            </tr>
          </table>
        </div>
        <br />
        <div class="w-full rounded-md border border-gray-300 p-4 shadow">
          <p>Equipments you manage:</p>
          <table class="w-full table-auto">
            <tr>
              <th>Equipment</th>
              <th>Owned by</th>
              <th>Department</th>
              <th>Image</th>
            </tr>
            {#if data?.equipments && data?.equipments.length > 0}
              {#each data?.equipments as equipment (equipment.id)}
                <tr>
                  <td>{equipment.name}</td>
                  <td>
                    {equipment.admins
                      .map(
                        (admin) =>
                          `${admin.user.firstName} ${admin.user.lastName}`,
                      )
                      .join(", ")}
                  </td>
                  <td>{equipment.department}</td>
                  <td>
                    <img
                      src={equipment.image}
                      class="h-32"
                      alt={equipment.name}
                    />
                  </td>
                </tr>
              {/each}
            {/if}
            <tr class="bg-green-800">
              <td></td>
              <td>
                <a href="/equipment/add">
                  Add more equipment under your purview.
                </a>
              </td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </main>
    <br />
  </div>
</div>
