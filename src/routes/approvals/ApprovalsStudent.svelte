<script lang="ts">
  import type { PageData } from "./$types";
  import type { ItemType } from "./types";

  export let items: ItemType[];
  export let data: PageData;
</script>

See your approval requests here:

<table>
  <thead></thead>
  <tbody>
    {#each items as item (item.requestId)}
      <tr>
        <td><img src={item.place.image} alt="" class="h-8 w-8" /></td>
        <td>{item.place.name}</td>
        <td>
          Requested for:
          <ul>
            {#each item.requestDates as requestDate}
              <li>
                {new Date(requestDate.start).toLocaleString()} -
                {new Date(requestDate.end).toLocaleString()}
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
          <p>Overall status:</p>
          {#if item.adminsStatus.every((status) => status.status === "REJECTED")}
            <p>DENIED</p>
          {:else if item.adminsStatus.every((status) => status.status === "APPROVED")}
            <p>APPROVED</p>
          {:else}
            <p>WAITING</p>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
