<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { Heading, Button } from "flowbite-svelte";

  export let data: PageData;

  let loggedIn: boolean;
  let userRole: string;
  if (data.isLoggedIn) {
    loggedIn = true;
  } else loggedIn = false;
  console.log(`loggedIn status is: ${loggedIn}`);
</script>

<svelte:head>
  <title>Roamer</title>
</svelte:head>

<div class="grid h-full grid-cols-4">
  <div class="col-span-3">
    <img
      src="/stock images/stock_1.png"
      alt="Stock Image"
      class="h-full w-full object-cover"
      aria-hidden="true"
    />
  </div>
  <div class="col-span-1">
    <div class="mt-64 flex">
      <div>
        <div class="mb-10 flex items-center">
          <h1 class="font-trocchi text-4xl font-bold">Roamer</h1>
          <img src="/logo.png" alt="" class="ml-2 mr-3 h-8" />
          <h1 class="mr-3 text-4xl font-bold">by</h1>
          <h1 class="font-trocchi text-4xl font-bold">Leo</h1>
          <img src="/about-photos/logos/logo_v5.png" alt="" class="ml-2 h-8" />
        </div>

        <br />

        {#if loggedIn}
          <Heading
            tag="h1"
            class="mb-4 flex justify-center"
            customSize="text-2xl font-medium "
          >
            Hey there, <strong>{data.username}</strong>!</Heading
          >
          <br />
          <div class="flex flex-col">
            <Button color="green" href="/dashboard" size="lg">Dashboard</Button>
            <Button color="green" href="/search" size="lg" class="mt-4"
              >Search</Button
            >
            <Button color="green" href="/approvals" size="lg" class="mt-4"
              >Approvals</Button
            >
          </div>
        {:else if !loggedIn}
          <div class="flex flex-col">
            <Button color="green" href="/login" size="lg">Sign In</Button>
            <p class="mb-3 mt-10 flex justify-center text-lg font-semibold">
              Don't have an account yet?
            </p>
            <Button color="green" href="/register" size="lg">Register</Button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
