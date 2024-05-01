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
  <p class="mb-5 mt-0 text-6xl font-bold">Approvals</p>
  <div class="mt-4 flex h-screen w-3/4 flex-col items-center rounded-md p-4">
    <div class="h-sc w-full rounded-lg border-2 border-gray-300 p-4">
      <Table class="w-full">
        <thead></thead>
        <tbody class="space-y-10 divide-y divide-gray-200">
          <!-- TODO: FAULTY STYLE -->
          {#each items as item (item.requestId)}
            <TableBodyRow class="h-20">
              <td class="w-20 pr-1"
                ><img src={item.place.image} alt="" class="h-16 w-16" /></td
              >
              <td class="text-lg font-medium text-black">
                {item.place.name}
                <br />
                <p class="text-green-700">{item.students.length} students</p>
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
              <td class="text-lg font-semibold">
                <p class={overallStatusChecker(item).class}>
                  {overallStatusChecker(item).text}
                </p>
              </td>
              <td>
                {#if data.isValidAdmin && selfAdminStatus?.find((status) => item.requestId === status.id)?.status === "WAITING"}
                  <button
                    class="text-lg font-semibold text-black hover:bg-log-in-green"
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
            </TableBodyRow>
          {/each}
        </tbody>
      </Table>
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
