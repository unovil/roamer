<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";
  import { Spinner, Heading } from "flowbite-svelte";
  import { ArrowRightOutline } from "flowbite-svelte-icons";
  import { Table, TableBodyRow } from "flowbite-svelte";

  export let data: PageData;
  let searchTerm = data.searchTerm;
  let searchCategory = data.searchCat;
  $: results = data.results;

  let timeoutId: NodeJS.Timeout;
  $: {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const { query, term } = searchQuery(searchTerm, searchCategory, $page);
      searchTerm = term;
      if (query != "") goto(`/search?${query}`);
    }, 500);
  }
</script>

<svelte:head>
  <title>Roamer | Search{searchTerm ? ` - "${searchTerm}"` : ""}</title>
</svelte:head>

<div class="mb-10 mt-20 flex items-start justify-center text-6xl font-bold">
  <h1>Roaming for something?</h1>
</div>

<form class="flex flex-row items-center justify-center space-x-2 rounded">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    bind:value={searchTerm}
    autofocus
    placeholder="Search..."
    class="w-2/5 rounded-md"
  />
  <select
    name="searchCategory"
    bind:value={searchCategory}
    class="rounded-md bg-green-100"
  >
    <option value="facility" class="text-semibold">Facility</option>
    <option value="equipment">Equipment</option>
  </select>
</form>

<br />

{#if data.searchCat === "equipment" || data.searchCat === "facility"}
  {#if searchTerm}
    <div
      class="mx-auto flex h-screen w-3/4 justify-center rounded-md border border-gray-300 p-4 shadow"
    >
      {#if typeof results !== "undefined" && results !== null && results.length > 0}
        <Table>
          {#each results as result (result.id)}
            <TableBodyRow>
              <td>
                <img
                  src={result.image}
                  alt={result.name}
                  class="h-48 w-48 object-contain"
                />
              </td>
              <td>
                <div class="ml-8">
                  <h2 class="text-lg font-bold text-green-700">
                    {result.name}
                  </h2>
                  <p class="font-medium text-black">
                    {result.admins
                      .map((admin) => {
                        return admin.user.firstName + " " + admin.user.lastName;
                      })
                      .join(", ")}
                  </p>
                </div>
              </td>
              <td class="w-20">
                <button>
                  <a
                    href={`${data.searchCat === "equipment" ? "/equipment/" : "/facility/"}${result.id}`}
                  >
                    <ArrowRightOutline class="ms-2 h-16 w-16" />
                  </a>
                </button>
              </td>
            </TableBodyRow>
          {/each}
        </Table>
      {:else}
        <div class="text-center">
          <Heading tag="h1" class="mb-4 text-3xl">No results found.</Heading>
          <Spinner color="green" size={10} />
        </div>
      {/if}
    </div>
  {/if}
{/if}
