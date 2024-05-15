<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import { overallStatusChecker, type ItemType } from "./helperFunctions";
  import { Modal, Button } from "flowbite-svelte";
  export let defaultModal: boolean;
  export let selectedItem: ItemType;
  // export let addReview: boolean;
  export let approvalStatus: "Approval" | "Denial" | undefined;
  export let data: PageData;
  export let reviewText: string;

  let form: HTMLFormElement;

  let formAction = "";
  $: {
    switch (approvalStatus) {
      case "Approval":
        formAction = "?/approve";
        break;
      case "Denial":
        formAction = "?/deny";
        break;
      default:
        formAction = "";
        break;
    }
  }
</script>

<Modal
  title="Review {approvalStatus} of Roam"
  bind:open={defaultModal}
  autoclose
  on:close={() => {
    reviewText = "";
    approvalStatus = undefined;
  }}
>
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
    class="h-32 w-full resize-none rounded bg-gray-200 p-2 text-gray-700"
    value={reviewText}
    readonly
  />

  <svelte:fragment slot="footer">
    <span class="text-bold w-full text-black">
      Continue with your {approvalStatus?.toLowerCase()} of this roam?
    </span>
    <Button
      color="alternative"
      on:click={() => {
        approvalStatus = undefined;
      }}
    >
      Back
    </Button>
    <form method="post" bind:this={form} action={formAction}>
      <input
        type="text"
        hidden
        name="requestId"
        value={selectedItem.requestId}
      />
      <input type="text" hidden name="adminId" value={data.user.admin?.id} />
      <input type="text" hidden name="reasonText" value={reviewText} />
      <input type="text" hidden value={selectedItem.placeType} name="type" />
      {#if approvalStatus === "Approval"}
        <Button color="green" on:click={() => form.submit()}>Approve</Button>
      {:else if approvalStatus === "Denial"}
        <Button color="red" type="submit" on:click={() => form.submit()}>
          Deny
        </Button>
      {/if}
    </form>
  </svelte:fragment>
</Modal>
