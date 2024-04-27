<script lang="ts">
  import type { PageData } from "./$types";
  import type { ItemType } from "./types";

  export let items: ItemType[];
  export let data: PageData;
</script>

<div
  class="grid h-screen grid-cols-3 grid-rows-4 bg-white text-center"
  style="grid-template-columns: 2% 96% 2%;"
>
  <div
    class="col-start-2 col-end-3 row-start-2 row-end-3 flex h-screen flex-col items-center"
  >
    <p class="mb-5 mt-0 text-7xl font-bold">Approvals</p>
    <div class="mt-4 h-full w-4/5 rounded-md border border-gray-300 p-4 shadow">
      <table class="w-full table-auto">
        <thead></thead>
        <tbody>
          {#each items as item (item.requestId)}
            <tr>
              <td><img src={item.place.image} alt="" class="h-8 w-8" /></td>
              <td class="font-medium">{item.place.name}</td>
              <td>
                <p class="font-bold">Requested for:</p>
                <ul>
                  {#each item.requestDates as requestDate}
                    <li>
                      {new Date(requestDate.start).toLocaleString()} -
                      {new Date(requestDate.end).toLocaleString()}
                    </li>
                  {:else}
                    <i>No dates given.</i>
                  {/each}
                </ul>
              </td>
              <td>
                {#each item.students as student (student.id)}
                  <p class="font-medium">{student.name} ({student.section})</p>
                {/each}
              </td>
              <td>
                {#each item.adminsStatus as admin (admin.id)}
                  <p class="font-semibold">
                    {admin.name}
                    {admin.id === data.user.admin?.id ? "(YOU)" : ""} - {admin.status}
                  </p>
                {/each}
              </td>
              <td>
                {#if item.description === "" || item.description.length === 0}
                  <i>No description given.</i>
                {:else}
                  <p>{item.description}</p>
                {/if}
              </td>
              <td>
                <p class="font-bold">Overall status:</p>
                {#if item.adminsStatus.every((status) => status.status === "REJECTED")}
                  <p class="font-medium text-red-600">DENIED</p>
                {:else if item.adminsStatus.every((status) => status.status === "APPROVED")}
                  <p class="font-medium text-green-600">APPROVED</p>
                {:else}
                  <p class="font-medium text-yellow-600">WAITING</p>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
