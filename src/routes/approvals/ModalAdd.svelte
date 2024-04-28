<script lang="ts">
  import { overallStatusChecker, type ItemType } from "./helperFunctions";
  import { Modal, Button } from "flowbite-svelte";
  export let defaultModal: boolean;
  export let selectedItem: ItemType;
  export let addReview: boolean;
  export let approvalStatus: "Approval" | "Denial" | undefined;
  export let reviewText: string;

  let footer = {
    text: "Drafting stage",
    color: "text-black",
  };

  const textValidation = () => {
    reviewText = reviewText.trim();

    if (reviewText.length == 0) {
      footer.text = "Please write a review before submitting.";
      footer.color = "text-red-500";
      return false;
    } else if (reviewText.length > 1600) {
      footer.text = `Review is too long by ${reviewText.length - 1600} characters. Please shorten it.`;
      footer.color = "text-red-500";
      return false;
    } else {
      footer.text = "Drafting stage";
      footer.color = "text-black";
      return true;
    }
  };
</script>

<Modal
  title="Add Review"
  bind:open={defaultModal}
  autoclose={false}
  on:close={() => {
    reviewText = "";
    footer.text = "Drafting stage";
    footer.color = "text-black";
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
    bind:value={reviewText}
    class="h-32 w-full resize-none overflow-auto rounded text-black"
    placeholder="Type your review here. Make sure to properly (but briefly) explain why you want to approve or deny this roam."
  />

  <svelte:fragment slot="footer">
    <span class="text-bold w-full {footer.color}">{footer.text}</span>
    <Button
      color="green"
      on:click={() => {
        if (!textValidation()) {
          return;
        }
        defaultModal = false;
        approvalStatus = "Approval";
        defaultModal = true; // to trigger the ModalReviewAdd (yes i know it's awful but it works for now)
      }}
    >
      Approve
    </Button>
    <Button
      color="red"
      on:click={() => {
        if (!textValidation()) {
          return;
        }
        defaultModal = false;
        approvalStatus = "Denial";
        defaultModal = true; // to trigger the ModalReviewAdd (yes i know it's awful but it works for now)
      }}
    >
      Deny
    </Button>
  </svelte:fragment>
</Modal>
