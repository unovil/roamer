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
    DropdownHeader,
    Avatar,
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
      <NavUl
        {hidden}
        activeUrl={pageUrl}
        ulClass="flex flex-col p-3 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium items-center"
      >
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
        <NavLi href="/about">About Roamer</NavLi>
        <div class="flex cursor-pointer items-center pl-5 md:order-2">
          {#if data.user?.pfp.length == 0}
            <Avatar>{data.user?.firstName[0]}{data.user?.lastName[0]}</Avatar>
          {:else}
            <Avatar src={data.user?.pfp} />
          {/if}
          <ChevronDownOutline class="ml-2 h-5 w-5" />
          <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
        </div>
        <Dropdown class="z-20 w-auto">
          <DropdownHeader>
            <span class="text-bold block text-sm text-primary-600"
              >{data.user?.firstName} {data.user?.lastName}</span
            >
            <span class="block truncate text-sm font-medium"
              >{data.user?.email}</span
            >
          </DropdownHeader>
          <DropdownItem href="/profile">Edit profile</DropdownItem>
          <DropdownDivider />
          <form method="post">
            <button
              type="submit"
              formaction="/dashboard?/logout"
              class="w-full"
            >
              <DropdownItem
                defaultClass="font-medium py-2 px-4 text-sm hover:bg-red-200 dark:hover:bg-gray-700 text-red-500"
                >Sign out</DropdownItem
              >
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
