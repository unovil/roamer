<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";
  import { Search, Button } from 'flowbite-svelte';
  
  export let data: PageData;
  let searchTerm: string | null = null;
  let searchCategory: string;
</script>

<div class="flex h-full w-full flex-col items-center  bg-gradient-to-r from-green-100 via-green-200 to-green-300 p-4 text-center">
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col">
    <main>
      <h1 class="text-7xl font-semibold">
        Welcome, <strong>{data.userInfo.firstName}</strong>
        !
      </h1>
      <h1 class="m-4 mt-3 text-3xl font-semibold">
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
        <div class="flex w-full justify-between">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search..."
            class="mb-2 mr-2 flex-grow w-full rounded-md border border-gray-300 p-2 shadow"
          />
          <select
            name="searchCategory"
            bind:value={searchCategory}
            class="mb-2 mr-2 flex rounded-md border border-gray-300 p-2 shadow"
          >
            <option value="facility">Facility</option>
            <option value="equipment">Equipment</option>
          </select>
          <input
            type="submit"
            value="Search"
            class="mb-2 flex rounded-md border border-gray-300 bg-log-in-green p-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
          />
        </div>
      </form>

      <div class="mt-20 flex justify-between">
        <div class="mr-10 w-1/2 rounded-md border border-gray-300 p-4 shadow">
          <p class="text-lg font-bold">
            Section: {data?.sectionInfo?.section ?? "null"}
          </p>
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
                    <span class="italic text-gray-600">(You)</span>
                  {/if}
                </td>
                <td>{student.lrn}</td>
              </tr>
            {/each}
          </table>
        </div>

        <div class="w-1/2 rounded-md border border-gray-300 p-4 shadow">
          <p class="text-lg font-bold">Recent bookings:</p>
        </div>
      </div>
      <ul></ul>
    </main>

    <br />
  </div>
</div>
