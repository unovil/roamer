<script lang="ts">
  import { overallStatusChecker, type ItemType } from "./helperFunctions";
  import { Modal, Button } from "flowbite-svelte";
  export let defaultModal: boolean;
  export let selectedItem: ItemType;
  export let addReview: boolean;
  export let approvalStatus: "Approval" | "Denial" | undefined;
</script>

<Modal title="Add Review" bind:open={defaultModal} autoclose outsideclose>
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
      <button
        class="text-black hover:underline"
        type="button"
        on:click={() => {
          addReview = false;
          defaultModal = true;
        }}
      >
        See reviews
      </button>
      <span class="text-black">{">"}</span>
    </div>
  </div>
  <h2 class="text-lg font-bold text-black">Request Dates</h2>
  <ol class="text-black">
    {#each selectedItem.requestDates as requestDate}
      <li>
        {new Date(requestDate.start).toLocaleString()} -
        {new Date(requestDate.end).toLocaleString()}
      </li>
    {/each}
  </ol>

  <h2 class="text-lg font-bold text-black">Description</h2>
  <p class="text-black">
    {selectedItem.description}
  </p>

  <h2 class="text-lg font-bold text-black">Linked Students</h2>
  <table class="w-full text-black">
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

  <h2 class="text-lg font-bold text-black">Your Review</h2>
  <textarea
    class="h-32 w-full resize-none overflow-auto rounded text-black"
    placeholder="Type your review here. Make sure to properly (but briefly) explain why you want to approve or deny this request."
  />

  <svelte:fragment slot="footer">
    <span class="text-bold w-full text-black">Drafting stage</span>
    <Button
      color="green"
      on:click={() => {
        approvalStatus = "Approval";
      }}
    >
      Approve
    </Button>
    <Button
      color="red"
      on:click={() => {
        approvalStatus = "Denial";
      }}
    >
      Deny
    </Button>
  </svelte:fragment>
</Modal>
