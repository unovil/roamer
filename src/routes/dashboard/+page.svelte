<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";

  export let data: PageData;
  let searchTerm: string | null = null;
</script>

<main>
  <h1>Looking for something to roam about?</h1>
  <form
    on:submit|preventDefault={() => {
      const query = searchQuery(searchTerm, $page)
      if (query != "") goto(`/search?${query}`);
    }}
  >
    <input type="text" bind:value={searchTerm} placeholder="Search..." />
    <input type="submit" value="Search" />
  </form>

  <h1>Welcome, <strong>{data.userInfo.firstName}</strong>!</h1>
  <br />
  <p>Section: {data?.sectionInfo?.section ?? "null"}</p>
  <br />
  <table>
    <tr>
      <th>Student</th>
      <th>LRN</th>
    </tr>
    {#each data?.sectionInfo?.students ?? [] as student (student.id)}
      <tr>
        <td
          >{student.user.firstName + " " + student.user.lastName}
          {#if student.user.id == data.userInfo.id}
            <span class="text-gray-600 italic"> (You)</span>
          {/if}
        </td>
        <td>{student.lrn}</td>
      </tr>
    {/each}
  </table>
  <br />
  Recent bookings:
  <ul></ul>
</main>

<br />

<aside>
  <form method="post">
    <button type="submit" formaction="?/logout">LOGOUT</button>
  </form>
</aside>
