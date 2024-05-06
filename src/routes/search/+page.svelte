<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";
  import { Spinner, Heading } from "flowbite-svelte";
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

<div class="mb-10 mt-10 flex items-start justify-center text-3xl font-bold">
  <h1>Roaming for something?</h1>
</div>

<form class="flex flex-row items-center justify-center space-x-2 rounded">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    bind:value={searchTerm}
    autofocus
    placeholder="Search..."
    class="h-10 w-3/6 rounded-md"
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
      class="mx-auto flex h-auto w-3/4 justify-center rounded-md border border-gray-300 p-4 shadow-md"
    >
      {#if typeof results !== "undefined" && results !== null && results.length > 0}
        <Table>
          {#each results as result (result.id)}
            <TableBodyRow>
              <td class="relative h-16 w-16 text-right">
                <img
                  src={result.image}
                  alt={result.name}
                  class="left-0 top-0 h-16 w-16 rounded-md object-cover"
                />
              </td>
              <a
                href={`${data.searchCat === "equipment" ? "/equipment/" : "/facility/"}${result.id}`}
              >
                <td>
                  <div class="ml-8">
                    <h2 class="text-lg font-bold text-green-700">
                      {result.name}
                    </h2>
                    <p class="font-medium text-black">
                      {result.admins
                        .slice(0, 5)
                        .map((admin) => {
                          return (
                            admin.user.firstName + " " + admin.user.lastName
                          );
                        })
                        .join(", ")}
                      {#if result.admins.length > 5}
                        <span class="italic"
                          >and {result.admins.length - 5} more admins</span
                        >
                      {/if}
                    </p>
                  </div>
                </td>
              </a>
              <td class="w-34">
                <button class = "text-xl text-black font-bold ml-40">
                  <a
                    href={`${data.searchCat === "equipment" ? "/equipment/" : "/facility/"}${result.id}`}
                  >
                    >
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
