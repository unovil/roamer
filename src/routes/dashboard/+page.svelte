<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";

  export let data: PageData;
  let searchTerm: string | null = null;
  let searchCategory: string;
</script>

<div class="banner">
  <img src="/logo.png" alt="Logo" class="h-14 mr-3 ml-3 mt-3 mb-3" />
  <span class="logo-name text-2xl font-trocchi text-white">Roamer</span>
  <aside>
    <form method="post">
      <button type="submit" formaction="?/logout" class="mr-20 place-self-end">
        LOGOUT
      </button>
    </form>
  </aside>
</div>

<div
  class="grid grid-cols-3 grid-rows-4 h-screen text-center bg-white"
  style="grid-template-columns: 25% 50% 25%;"
>
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col">
    <main>
      <h1 class="text-7xl font-semibold">
        Welcome, <strong>{data.userInfo.firstName}</strong>
        !
      </h1>
      <h1 class="text-4xl font-semibold mt-3 m-4">
        Looking for something to roam about?
      </h1>

      <form
        on:submit|preventDefault={() => {
          const { query, term } = searchQuery(
            searchTerm,
            searchCategory,
            $page,
          );
          searchTerm = term;
          if (query != "") goto(`/search?${query}`);
        }}
      >
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search..."
          class="block border border-gray-300 rounded-md w-3/5 p-2 mb-2 shadow"
        />
        <select name="searchCategory" bind:value={searchCategory}>
          <option value="facility">Facility</option>
          <option value="equipment">Equipment</option>
        </select>
        <input type="submit" value="Search" />
      </form>
      <div class="rectangle">
        <p>Section: {data?.sectionInfo?.section ?? "null"}</p>
        <br />
        <table>
          <tr>
            <th>Student</th>
            <th>LRN</th>
          </tr>
          {#each data?.sectionInfo?.students ?? [] as student (student.id)}
            <tr>
              <td>
                {student.user.firstName + " " + student.user.lastName}
                {#if student.user.id == data.userInfo.id}
                  <span class="text-gray-600 italic">(You)</span>
                {/if}
              </td>
              <td>{student.lrn}</td>
            </tr>
          {/each}
        </table>
      </div>
      <div class="rectangle">
        <br />
        Recent bookings:
      </div>
      <ul></ul>
    </main>

    <br />
  </div>
</div>

<style>
  body {
    background-color: #ffffff;
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
