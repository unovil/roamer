<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";
  export let data: LayoutData;
</script>

<div class="flex flex-col">
  {#if !($page.url.pathname === "/" || data.isLoggedIn === false || data.needsRegisterFollowup === true)}
    <div
      class="sticky left-0 top-0 z-10 mb-2 flex h-20 w-full items-center justify-between bg-top-bar-green px-4"
    >
      <div class="flex items-center">
        <img src="/logo.png" alt="Logo" class="mr-3 h-14" />
        <span class="logo-name font-trocchi text-2xl text-white">Roamer</span>
      </div>
      <div class="space-x-20 text-white font-trocchi text-xl font-medium">
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
        <div role="link" class="text-right font-medium text-white font-trocchi" tabindex="0">
          <span class="mb-0">
            {`${data.user?.firstName} ${data.user?.lastName}`}
          </span>
          <br />
          <form method="post">
            <span class="font-bold  text-red-900">
              <button
                type="submit"
                formaction="/dashboard?/logout"
                class="mt-0 inline cursor-pointer hover:underline"
              >
                Logout
              </button>
              &gt;
            </span>
          </form>
        </div>
      </aside>
    </div>
  {/if}

  <slot />
</div>
