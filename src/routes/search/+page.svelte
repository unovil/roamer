<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";
  import { Spinner, Heading} from 'flowbite-svelte';
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

{#if searchTerm}
  <div
    class="mx-auto mt-10 h-screen w-3/5 justify-items-center rounded-lg border-2 border-gray-300 p-4"
  >
    <table>
      {#if typeof results !== "undefined" && results !== null}
        {#each results as result (result.id)}
          <tr>
            <td>
              <img src={result.image} alt={result.name} class="h-auto w-auto object-contain" />
            </td>
            <td>
              <a
                href={`${data.searchCat === "equipment" ? "/equipment/" : "/facility/"}${result.id}`}
              >
                <div class="ml-8">
                  <h2 class="font-bold">{result.name}</h2>
                  <p>
                    {result.admins
                      .map((admin) => {
                        return admin.user.firstName + " " + admin.user.lastName;
                      })
                      .join(", ")}
                  </p>
                </div>
              </a>
            </td>
          </tr>
        {:else}
        <div class="items-center">
          <Heading tag="h1" class="mb-4 text-3xl text-center" >No results found.</Heading>
          <Spinner color="green" size={10}/>
        </div>
        {/each}
      {/if}
    </table>
  </div>
{/if}
