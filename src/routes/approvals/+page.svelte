<script lang="ts">
  import type { PageData } from "./$types";
  import ApprovalsAdmin from "./ApprovalsAdmin.svelte";
  import ApprovalsStudent from "./ApprovalsStudent.svelte";
  import type { ItemType } from "./types";
  export let data: PageData;

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
</script>

{#if data.isValidAdmin}
  <ApprovalsAdmin {items} {data}/>
{:else if data.isValidStudent}
  <ApprovalsStudent {items} {data} />
{/if}