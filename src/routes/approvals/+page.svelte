<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";
  export let data: PageData;

  const items = data.requests
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
            (s) => s.adminId === admin.id
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

For your approvals:

<table>
  <thead></thead>
  <tbody>
    {#each items as item (item.requestId)}
      <tr>
        <td><img src={item.place.image} alt="" class="w-8 h-8" /></td>
        <td>{item.place.name}</td>
        <td
          >Requested for:
          <ul>
            {#each item.requestDates as requestDate}
              <li>
                {new Date(requestDate.start).toLocaleDateString()} - {new Date(
                  requestDate.end
                ).toLocaleDateString()}
              </li>
            {:else}
              <i>No dates given.</i>
            {/each}
          </ul>
        </td>
        <td>
          {#each item.students as student (student.id)}
            <p>{student.name} ({student.section})</p>
          {/each}
        </td>
        <td>
          {#each item.adminsStatus as admin (admin.id)}
            <p>
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
          {#if item.adminsStatus.find((admin) => admin.id === data.user.admin?.id)?.status === "REJECTED"}
            <p>DENIED</p>
          {:else if item.adminsStatus.find((admin) => admin.id === data.user.admin?.id)?.status === "APPROVED"}
            <p>APPROVED</p>
          {:else}
            <form method="post">
              <input
                type="text"
                hidden
                value={item.requestId}
                name="requestId"
              />
              <input type="text" hidden value={item.placeType} name="type" />
              <input
                type="text"
                hidden
                value={data.user.admin?.id}
                name="adminId"
              />
              <div>
                <button type="submit" formaction="?/approve">Approve</button>
              </div>
              <div>
                <button type="submit" formaction="?/deny">Deny</button>
              </div>
            </form>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
