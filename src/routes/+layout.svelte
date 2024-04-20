<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { page } from '$app/stores';
  export let data: LayoutData;
</script>

{#if ($page.url.pathname === "/") || (data.isLoggedIn === false || data.needsRegisterFollowup === true)}
<div></div>
{:else if data.isStudent === true}
<a href="/dashboard">Dashboard</a>
<a href="/search">Search</a>
{:else if data.isAdmin === true}
<a href="/admindashboard">Dashboard</a>
<a href="/approvals">Approvals</a>
{/if}

<br>

<slot />