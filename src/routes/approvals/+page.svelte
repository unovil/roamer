<script lang="ts">
  import type { PageData } from "./$types";
  import ModalAdd from "./ModalAdd.svelte";
  import ModalReadonly from "./ModalReadonly.svelte";
  import ModalReviewAdd from "./ModalReviewAdd.svelte";
  import {
    overallStatusChecker,
    statusChecker,
    type ItemType,
  } from "./helperFunctions";
  import { Table, TableBodyRow } from "flowbite-svelte";

  export let data: PageData;

  let defaultModal = false;
  let selectedItem: ItemType;
  let addReview = false;
  let approvalStatus: "Approval" | "Denial" | undefined;
  let reviewText: string = "";

  const items: ItemType[] = data.requests
    .filter((request) => request.facility || request.equipment)
    .map((request) => {
      return {
        placeType: request.facility ? "facility" : "equipment",
        place: request.facility
          ? request.facility
          : (request.equipment as NonNullable<typeof request.equipment>),
        requestId: request.id,
        adminsStatus: request.admins.map((admin) => {
          const status = request.requestStatus
            ? request.requestStatus.find((s) => s.adminId === admin.id)
            : undefined;
          return {
            name: `${admin.user.firstName} ${admin.user.lastName}`,
            id: admin.id,
            status: status?.requestStatus || "WAITING",
            reason: status?.reason || "",
          };
        }),
        students: request.students.map((student) => {
          return {
            name: `${student.user.lastName}, ${student.user.firstName}`,
            section: `${student.section.grade} - ${student.section.name}`,
            id: student.id,
          };
        }),
        requestDates: request.requestDates,
        description: request.description,
        dateCreated: request.dateCreated,
      };
    });

  const selfAdminStatus =
    data.isValidAdmin && data.user.admin
      ? items.map((item) => {
          const status = statusChecker(
            item.adminsStatus.find((admin) => admin.id === data.user.admin?.id),
          );
          let pText: string;
          switch (status?.text) {
            case "DENIED":
              pText = "You denied this roam.";
              break;
            case "APPROVED":
              pText = "You approved this roam.";
              break;
            case "WAITING":
              pText = "You haven't reviewed this roam yet.";
              break;
            default:
              pText = "";
              break;
          }
          return {
            id: item.requestId,
            text: pText,
            status: status?.text,
            class: status?.class,
          };
        })
      : null;
</script>

<svelte:head>
  <title>Roamer | Approvals</title>
</svelte:head>

<div class="flex h-full w-full flex-col items-center bg-white p-4 text-center">
  <p class="mb-3 mt-0 text-4xl font-bold sm:text-2xl md:text-6xl">Approvals</p>
  <div
    class="mt-4 flex h-screen w-full flex-col items-center rounded-md p-4 sm:w-3/4"
  >
    <div
      class="h-sc w-full overflow-x-auto rounded-lg border-2 border-gray-300 p-4"
    >
      {#if items.length > 0}
        <table class="w-full">
          <thead></thead>
          <tbody>
            <!-- TODO: FAULTY STYLE -->
            {#each items as item (item.requestId)}
              <tr
                class="flex w-full flex-col items-start justify-between border-b hover:bg-green-100 sm:flex-row sm:items-center"
              >
                <div class="mb-4 flex w-full items-center sm:mb-0 sm:w-auto">
                  <td class="w-20 pl-3 pr-1"
                    ><img
                      src={item.place.image}
                      alt=""
                      class="h-16 w-16 object-cover"
                    /></td
                  >
                  <td class=" py-4 text-left">
                    {item.place.name}
                    <br />
                    <span class="text-green-700"
                      >{item.students.length} student{item.students.length !== 1
                        ? "s"
                        : ""}</span
                    >
                    {#if data.isValidAdmin}
                      <br />
                      <span
                        class={selfAdminStatus?.find(
                          (status) => item.requestId === status.id,
                        )?.class}
                      >
                        {selfAdminStatus?.find(
                          (status) => item.requestId === status.id,
                        )?.text}
                      </span>
                    {/if}
                  </td>
                </div>
                <div class="mb-4 flex w-full items-center sm:mb-0 sm:w-auto">
                  <td class="mr-8 text-lg font-semibold">
                    <p class={overallStatusChecker(item).class}>
                      {overallStatusChecker(item).text}
                    </p>
                  </td>
                  <div class="flex w-full items-center justify-end sm:w-auto">
                    <td>
                      {#if data.isValidAdmin && selfAdminStatus?.find((status) => item.requestId === status.id)?.status === "WAITING"}
                        <button
                          class="text-lg font-semibold text-black hover:text-log-in-green"
                          on:click={() => {
                            defaultModal = true;
                            selectedItem = item;
                            addReview = true;
                          }}
                        >
                          Add a review {">"}
                        </button>
                      {:else}
                        <button
                          class="text-lg font-semibold text-black hover:text-log-in-green"
                          on:click={() => {
                            defaultModal = true;
                            selectedItem = item;
                            addReview = false;
                          }}
                        >
                          See reviews {">"}
                        </button>
                      {/if}
                    </td>
                  </div>
                </div>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else if data?.isAdmin}
        <p>There are no roam requests yet for you to see.</p>
      {:else if data?.isStudent}
        <p>You have not made any roam requests yet.</p>
      {/if}
    </div>
  </div>
</div>

{#if addReview}
  {#if approvalStatus}
    <ModalReviewAdd
      bind:defaultModal
      {selectedItem}
      bind:approvalStatus
      bind:reviewText
      {data}
    />
  {:else}
    <ModalAdd
      bind:defaultModal
      bind:reviewText
      {selectedItem}
      bind:addReview
      bind:approvalStatus
    />
  {/if}
{:else}
  <ModalReadonly bind:defaultModal {selectedItem} bind:addReview {data} />
{/if}
