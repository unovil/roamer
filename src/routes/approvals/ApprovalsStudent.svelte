<script lang="ts">
  import type { PageData } from "./$types";
  import { overallStatusChecker, statusChecker, type ItemType } from "./helperFunctions";
  import { Modal, Button } from "flowbite-svelte";
  let defaultModal = false;
  let selectedItem: ItemType;

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
      <table class="w-full">
        <thead></thead>
        <tbody class="space-y-5 divide-y divide-gray-200">
          <!-- TODO: FAULTY STYLE -->
          {#each items as item (item.requestId)}
            <tr>
              <td><img src={item.place.image} alt="" class="h-12 w-12" /></td>
              <td class="font-medium">
                {item.place.name}
                <br />
                {item.students.length} students
              </td>
              <td>
                <p class={overallStatusChecker(item).class}>{overallStatusChecker(item).text}</p>
              </td>
              <td>
                <button on:click={() => {
                  defaultModal = true;
                  selectedItem = item;
                  }}>
                  See reviews {">"}
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<Modal title="Request Review" bind:open={defaultModal} autoclose outsideclose>
  <div class="flex items-center">
    <img src={selectedItem.place.image} alt="" class="h-16 mr-4">
    <div>
      <h1 class="text-xl">{selectedItem.place.name} <i>({selectedItem.placeType})</i></h1>
      <p class="text-gray-500 {overallStatusChecker(selectedItem).class}">Overall status: {overallStatusChecker(selectedItem).text}</p>
    </div>
  </div>

  <details class="text-black">
    <summary>Request Dates</summary>
    {#each selectedItem.requestDates as requestDate}
      <li>
        {new Date(requestDate.start).toLocaleString()} -
        {new Date(requestDate.end).toLocaleString()}
      </li>
    {/each}
  </details>

  {#each selectedItem.adminsStatus as status}
    <p class="text-black">{status.name} - <span class={statusChecker(status).class}>{statusChecker(status).text}</span></p>
    <textarea 
      readonly 
      class="bg-gray-200 text-gray-700 p-2 rounded w-full h-32 resize-none" 
      value={statusChecker(status).reason}/>
  {/each}

  <p class="text-black">Further information:</p>
  <details class="text-black">
    <summary>Request Description</summary>
    <p>{selectedItem.description}</p>
  </details>
  <details class="text-black">
    <summary>Linked Students</summary>
    <table class="w-full">
      <thead></thead>
      <tbody>
        {#each selectedItem.students as student}
          <tr>
            <td>{student.name}</td>
            <td>{student.section}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    
  </details>

</Modal>