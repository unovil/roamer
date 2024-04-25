<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<style>
  body {
      background-color: #FFFFFF;
      margin: 0; /* Remove default margin */
      padding: 0; /* Remove default padding */
      
  }

  .banner {
    position: fixed; /* Change to fixed position */
    top: 0;
    left: 0;
    width: 100%;
    height: 79px;
    background-color: #059669;
    z-index: 1; /* Ensure banner is above other content */
    display: flex; /* Ensure logo and logout button are in a row */
    align-items: center; /* Center items vertically */
    padding: 0 20px; /* Add padding to the sides */
}
.rectangle {
    border: 1px solid #000; /* Black border */
    padding: 20px; /* Add padding for spacing */
    border-radius: 5px; /* Add rounded corners */
    width: fit-content; /* Make the rectangle width fit its content */
    margin: 0 auto; /* Center the rectangle horizontally */
    float: left;
}

  
</style>
<div class="banner">
  <img src="/logo.png" alt="Logo" class="h-14 mr-3 ml-3 mt-3 mb-3" />
  <span class="logo-name text-2xl font-trocchi text-white">Roamer</span>
      <aside>
        <form method="post">
          <button type="submit" formaction="?/logout" class="mr-20 place-self-end">LOGOUT</button>
        </form>
      </aside>
</div>

<div class="grid grid-cols-3 grid-rows-4 h-screen text-center bg-white" style="grid-template-columns: 25% 50% 25%;">
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col">
<main>
  <p class = "text-7xl font-semibold">Welcome, <strong>{data.userInfo.firstName}</strong>!</p>
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
          <td><img src={facility.image} class="h-32" alt={facility.name} /></td>
        </tr>
      {/each}
    {/if}
    <tr class="bg-green-800">
      <td></td>
      <td><a href="/facility/add">Add more facilities under your purview.</a></td>
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
          <td
            ><img src={equipment.image} class="h-32" alt={equipment.name} /></td
          >
        </tr>
      {/each}
    {/if}
    <tr class="bg-green-800">
      <td></td>
      <td><a href="/equipment/add">Add more equipment under your purview.</a></td>
      <td></td>
    </tr>
  </table>
</main>
<br />
</div>
</div>