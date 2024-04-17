<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";

  export let data: PageData;
  let searchTerm: string | null = data.searchTerm;

  $: console.log(data.searchTerm);
</script>

<form
  on:submit|preventDefault={() => {
    const query = searchQuery(searchTerm, $page);
    if (query != "") goto(`?${query}`);
  }}
>
  <input type="text" bind:value={searchTerm} placeholder="Search..." />
  <input type="submit" value="Search" />
</form>

