<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
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
