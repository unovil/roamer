<script lang="ts">
  import type { PageData } from "./$types";
  import ModalAdd from "./ModalAdd.svelte";
  import ModalReview from "./ModalReview.svelte";
  import {
    overallStatusChecker,
    statusChecker,
    type ItemType,
  } from "./helperFunctions";
  export let data: PageData;

  let defaultModal = false;
  let selectedItem: ItemType;
  let addReview = false;

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
          const status = request.requestStatus.find(
            (s) => s.adminId === admin.id,
          );
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
            case "REJECTED":
              pText = "You denied this request.";
              break;
            case "APPROVED":
              pText = "You approved this request.";
              break;
            case "WAITING":
              pText = "You haven't reviewed this request yet.";
              break;
            default:
              pText = "";
              break;
          }
          return {
            id: item.place.id,
            text: pText,
            status: status?.text,
            class: status?.class,
          };
        })
      : null;
</script>

<div class="flex h-full w-full flex-col items-center bg-white p-4 text-center">
  <p class="mb-5 mt-0 text-7xl font-bold">Approvals</p>
  <div
    class="mt-4 flex w-4/5 flex-col items-center rounded-md border border-gray-300 p-4 shadow"
  >
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
              {#if data.isValidAdmin}
                <br />
                <span
                  class={selfAdminStatus?.find(
                    (status) => item.place.id === status.id,
                  )?.class}
                >
                  {selfAdminStatus?.find(
                    (status) => item.place.id === status.id,
                  )?.text}
                </span>
              {/if}
            </td>
            <td>
              <p class={overallStatusChecker(item).class}>
                {overallStatusChecker(item).text}
              </p>
            </td>
            <td>
              {#if data.isValidAdmin && selfAdminStatus?.find((status) => item.place.id === status.id)?.status === "WAITING"}
                <button
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
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if addReview}
  <ModalAdd bind:defaultModal {selectedItem} />
{:else}
  <ModalReview bind:defaultModal {selectedItem} />
{/if}
