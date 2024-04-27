<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";

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
  <title>Roamer - Search</title>
</svelte:head>

<div
  class="grid h-screen grid-cols-3 grid-rows-4 bg-white text-center"
  style="grid-template-columns: 25% 50% 25%;"
>
  <div class="col-start-2 col-end-3 flex flex-col items-center justify-center">
    <form>
      <!-- svelte-ignore a11y-autofocus -->
      <h1 class="m-4 mb-10 mt-3 text-6xl font-bold">Roaming for something?</h1>

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
            class="mb-2 mr-2 flex-grow rounded-md border border-gray-300 p-2 shadow"
          />
          <select
            name="searchCategory"
            bind:value={searchCategory}
            class="mb-2 mr-2 flex rounded-md border border-gray-300 p-2 shadow"
          >
            <option value="facility">Facility</option>
            <option value="equipment">Equipment</option>
          </select>
        </div>
      </form>
    </form>
  </div>
  <br />

  <div class="flex h-screen items-center justify-center">
    {#if typeof results !== "undefined" && results !== null && results.length > 0}
      <div
        class="mt-4 h-full w-4/5 rounded-md border border-gray-300 p-4 shadow"
      >
      <table class="w-full table-auto">
          {#if typeof results !== "undefined" && results !== null}
            {#each results as result (result.id)}
              <tr>
                <td>
                  <img src={result.image} alt={result.name} class="h-20 w-20" />
                </td>
                <td>
                  <a
                    href={`${data.searchCat === "equipment" ? "/equipment/" : "/facility/"}${result.id}`}
                  >
                    <div>
                      <h2 class="font-bold">{result.name}</h2>
                      <p>
                        {result.admins
                          .map((admin) => {
                            return (
                              admin.user.firstName + " " + admin.user.lastName
                            );
                          })
                          .join(", ")}
                      </p>
                    </div>
                  </a>
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="2" class="font-bold">No results found</td>
              </tr>
            {/each}
          {/if}
        </table>
      </div>
    {/if}
  </div>
</div>
