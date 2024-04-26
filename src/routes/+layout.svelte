<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";
  export let data: LayoutData;

  let name = `${data.user?.firstName} ${data.user?.lastName}`;
  let showLogout = false;
</script>

{#if !($page.url.pathname === "/" || data.isLoggedIn === false || data.needsRegisterFollowup === true)}
  <div
    class="fixed left-0 top-0 z-10 mb-2 flex h-20 w-full items-center justify-between bg-top-bar-green px-4"
  >
    <div class="flex items-center">
      <img src="/logo.png" alt="Logo" class="mr-3 h-14" />
      <span class="logo-name font-trocchi text-2xl text-white">Roamer</span>
    </div>
    <div class="space-x-4">
      {#if data.isStudent === true}
        <a href="/dashboard">Dashboard</a>
        <a href="/approvals">Approvals</a>
        <a href="/search">Search</a>
      {:else if data.isAdmin === true}
        <a href="/admindashboard">Dashboard</a>
        <a href="/approvals">Approvals</a>
      {/if}
    </div>
    <aside class="relative">
      <div
        role="link"
        tabindex="0"
        on:mouseenter={() => (showLogout = true)}
        on:mouseleave={() => (showLogout = false)}
      >
        <span class="mb-0">{name}</span>
        {#if showLogout}
          <br>
          <form method="post">
            <button
              type="submit"
              formaction="/dashboard?/logout"
              class="w-full mt-0 font-bold text-red-900 hover:underline cursor-pointer"
            >
              Logout
            </button>
          </form>
        {/if}
      </div>
    </aside>
  </div>
{/if}

<slot />
