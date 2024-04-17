<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";

  export let data: PageData;
  let searchTerm = data.searchTerm;
  let searchCategory = data.searchCat;
  $: results = data.results;
</script>

<svelte:head>
  <title>Roamer - Search</title>
</svelte:head>

<form
  on:submit|preventDefault={() => {
    let query = searchQuery(searchTerm, searchCategory, $page);
    if (query != "") goto(`/search?${query}`);
  }}
>
  <input type="text" bind:value={searchTerm} placeholder="Search..." />
  <select name="searchCategory" bind:value={searchCategory}>
    <option value="facility">Facility</option>
    <option value="equipment">Equipment</option>
  </select>
  <input type="submit" value="Search" />
</form>

<br />

<table>
  {#if typeof results !== "undefined" && results !== null}
    {#each results as result (result.id)}
      <tr>
        <td><img src={result.image} alt={result.name} class="w-20 h-20" /></td>
        <td
          ><div>
            <h2 class="font-bold">{result.name}</h2>
            <p>
              {result.admins
                .map((admin) => {
                  return admin.user.firstName + " " + admin.user.lastName;
                })
                .join(", ")}
            </p>
          </div>
        </td>
      </tr>
    {:else}
      <tr>
        <td colspan="2" class="font-bold">No results found</td>
      </tr>
    {/each}
  {/if}
</table>
