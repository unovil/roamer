<script lang="ts">
  import type { PageData } from "./$types";
  import {
    overallStatusChecker,
    statusChecker,
    type ItemType,
  } from "./helperFunctions";
  import { Modal } from "flowbite-svelte";
  export let data: PageData;
  export let defaultModal: boolean;
  export let addReview: boolean;
  export let selectedItem: ItemType;
</script>

<Modal title="Request Review" bind:open={defaultModal} autoclose>
  <div class="flex items-center">
    <img src={selectedItem.place.image} alt="" class="mr-4 h-16" />
    <div>
      <h1 class="text-xl">
        {selectedItem.place.name}
        <i>({selectedItem.placeType})</i>
      </h1>
      <p class="text-gray-500 {overallStatusChecker(selectedItem).class}">
        Overall status: {overallStatusChecker(selectedItem).text}
      </p>
      {#if selectedItem.adminsStatus.find((status) => status.id === data.user.admin?.id)?.status === "WAITING"}
        <button
          class="text-black hover:underline"
          type="button"
          on:click={() => {
            addReview = true;
            defaultModal = true;
          }}
        >
          Add a review
        </button>
        <span class="text-black">{">"}</span>
      {/if}
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
    <p class="text-black">
      {status.name} -
      <span class={statusChecker(status)?.class}>
        {statusChecker(status)?.text}
      </span>
    </p>
    <textarea
      readonly
      class="h-32 w-full resize-none rounded bg-gray-200 p-2 text-gray-700"
      value={statusChecker(status)?.reason}
    />
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
