<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    Dropdown,
    DropdownItem,
    DropdownDivider,
  } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  export let data: LayoutData;

  $: pageUrl = $page.url.pathname;
</script>

<!-- <div class="flex flex-col">
  {#if !($page.url.pathname === "/" || data.isLoggedIn === false || data.needsRegisterFollowup === true)}
    <div
      class="sticky left-0 top-0 z-10 mb-2 flex h-20 w-full items-center justify-between bg-top-bar-green px-4"
    >
      <div class="flex items-center">
        <img src="/logo.png" alt="Logo" class="mr-3 h-14" />
        <span class="logo-name font-trocchi text-2xl text-white">Roamer</span>
      </div>
      <div class="space-x-20 text-xl font-bold text-white">
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
        <div role="link" class="text-right font-medium text-white" tabindex="0">
          <span class="mb-0">
            {`${data.user?.firstName} ${data.user?.lastName}`}
          </span>
          <br />
          <form method="post">
            <span class="font-bold text-red-900">
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

  
</div> -->
<div class="flex flex-col">
  {#if !($page.url.pathname === "/" || data.isLoggedIn === false || data.needsRegisterFollowup === true)}
    <Navbar
      let:hidden
      let:toggle
      color="green"
      class="sticky start-0 top-0 z-20 w-full border-b px-2 py-2.5 sm:px-4"
    >
      <NavBrand href="/">
        <img src="/logo.png" class="me-3 h-6 sm:h-9" alt="Roamer logo" />
        <span
          class="self-center whitespace-nowrap font-trocchi text-3xl font-semibold dark:text-white"
        >
          Roamer
        </span>
      </NavBrand>
      <NavHamburger on:click={toggle} />
      <NavUl {hidden} activeUrl={pageUrl}>
        <NavLi
          href={data.isStudent
            ? "/dashboard"
            : data.isAdmin
              ? "/admindashboard"
              : ""}
        >
          Dashboard
        </NavLi>
        <NavLi href="/approvals">Approvals</NavLi>
        <NavLi href="/search">Search</NavLi>
        <NavLi href="/about">About</NavLi>
        <NavLi class="text-profile-text-green cursor-pointer">
          {`${data.user?.firstName} ${data.user?.lastName}`}<ChevronDownOutline
            class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white"
          />
        </NavLi>
        <Dropdown class="z-20 w-44">
          <DropdownItem href="/profile">Profile</DropdownItem>
          <DropdownDivider />
          <form method="post">
            <DropdownItem>
              <button type="submit" formaction="/dashboard?/logout">
                Sign out
              </button>
            </DropdownItem>
          </form>
        </Dropdown>
      </NavUl>
    </Navbar>
  {/if}

  <slot />
</div>
