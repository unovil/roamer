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

<div class="flex h-screen flex-col">
  {#if !($page.url.pathname === "/" || data.isLoggedIn === false || data.needsRegisterFollowup === true) && !($page.url.pathname === "/about")}
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
        <NavLi class="text-profile-text-green cursor-pointer">
          {`${data.user?.firstName} ${data.user?.lastName}`}<ChevronDownOutline
            class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white"
          />
        </NavLi>
        <Dropdown class="z-20 w-44">
          <DropdownItem href="/about">About Roamer</DropdownItem>
          <DropdownDivider />
          <form method="post">
            <button
              type="submit"
              formaction="/dashboard?/logout"
              class="w-full"
            >
              <DropdownItem>Sign out</DropdownItem>
            </button>
          </form>
        </Dropdown>
      </NavUl>
    </Navbar>
  {:else if $page.url.pathname === "/about"}
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
          Roamer | About us
        </span>
      </NavBrand>
      {#if data.isLoggedIn !== false}
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
        </NavUl>
      {/if}
    </Navbar>
  {/if}
  <div class="overflow-auto">
    <slot />
  </div>
</div>
