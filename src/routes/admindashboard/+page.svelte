<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <p>Welcome, <strong>{data.userInfo.firstName}</strong>!</p>
  <br />
  <p>List of facilities you have:</p>
  <table>
    <tr>
      <th>Facility</th>
      <th>Owned by</th>
      <th>Department</th>
      <th>Image</th>
    </tr>
    {#if data?.facilities && data?.facilities.length > 0}
      {#each data?.facilities as facility (facility.id)}
        <tr>
          <td>{facility.name}</td>
          <td
            >{facility.admins
              .map((admin) => `${admin.user.firstName} ${admin.user.lastName}`)
              .join(", ")}</td
          >
          <td>{facility.department}</td>
          <td
            ><img
              src={`data:image/jpeg;base64,${facility.image}`}
              class="h-32"
              alt=""
            /></td
          >
        </tr>
      {/each}
    {/if}
    <tr class="bg-green-800">
      <td></td>
      <td>Add more facilities under your purview.</td>
      <td></td>
    </tr>
  </table>
  <br />
  <p>List of equipment you have:</p>
  <table>
    <tr>
      <th>Equipment</th>
      <th>Owned by</th>
      <th>Department</th>
      <th>Image</th>
    </tr>
    {#if data?.equipments && data?.equipments.length > 0}
      {#each data?.equipments as equipment (equipment.id)}
        <tr>
          <td>{equipment.name}</td>
          <td
            >{equipment.admins
              .map((admin) => `${admin.user.firstName} ${admin.user.lastName}`)
              .join(", ")}</td
          >
          <td>{equipment.department}</td>
        </tr>
      {/each}
    {/if}
    <tr class="bg-green-800">
      <td></td>
      <td>Add more equipment under your purview.</td>
      <td></td>
    </tr>
  </table>
</main>
<br />
<aside>
  <form method="post">
    <button type="submit" formaction="/dashboard?/logout">LOGOUT</button>
  </form>
</aside>
