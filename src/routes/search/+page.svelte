<script lang="ts">
  import type { PageData } from "./$types";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";
  import { Spinner, Heading } from "flowbite-svelte";

  export let data: PageData;
  let searchTerm = data.searchTerm;
  let searchCategory = data.searchCat;
  $: results = data.results;

  let timeoutId: NodeJS.Timeout;
  $: if (browser) {
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

<div
  class="mb-10 mt-10 flex items-start justify-center text-2xl font-bold sm:text-lg md:text-3xl lg:text-4xl"
>
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
      class="mx-auto flex h-auto w-3/4 justify-start rounded-md border border-gray-300 p-4 shadow-md sm:w-3/4"
    >
      {#if typeof results !== "undefined" && results !== null && results.length > 0}
        <table class="w-full">
          {#each results as result (result.id)}
            <tr
              class="flex w-full items-center justify-between border-b hover:bg-green-100"
            >
              <div class="flex items-center">
                <td class="relative ml-3 mr-8 w-16 py-4">
                  <img
                    src={result.image}
                    alt={result.name}
                    class="left-0 top-0 h-16 w-16 rounded-md object-cover"
                  />
                </td>
                <a
                  href={`${data.searchCat === "equipment" ? "/equipment/" : "/facility/"}${result.id}`}
                >
                  <td class="pl-4">
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
                  </td>
                </a>
              </div>
              <td>
                <button class="text-xl font-bold text-black">
                  <a
                    href={`${data.searchCat === "equipment" ? "/equipment/" : "/facility/"}${result.id}`}
                    class=""
                  >
                    >
                  </a>
                </button>
              </td>
            </tr>
          {/each}
        </table>
      {:else}
        <div class="mx-auto flex h-full flex-col items-center justify-center">
          <Heading tag="h1" class="mb-4 text-3xl">No results found.</Heading>
          <Spinner color="green" size={10} />
        </div>
      {/if}
    </div>
  {/if}
{/if}
