<script lang="ts">
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { Heading } from "flowbite-svelte";
  import { Footer } from "flowbite-svelte";

  export let data: PageData;

  let loggedIn: boolean;
  let userRole: string;
  if (data.isLoggedIn) {
    loggedIn = true;
  } else loggedIn = false;
  console.log(`loggedIn status is: ${loggedIn}`);

  let images = [
    "/background-homepage/bg_1.jpg",
    "/background-homepage/bg_2.jpg",
    "/background-homepage/bg_3.jpg",
  ];
  let currentImageIndex = 0;

  onMount(() => {
    const interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<svelte:head>
  <title>Roamer</title>
</svelte:head>

<div class="flex min-h-screen flex-col overflow-hidden">
  <div class="relative min-h-screen overflow-hidden">
    <img
      src={images[currentImageIndex]}
      alt="Background"
      class="absolute inset-0 min-h-screen overflow-hidden object-cover object-center brightness-50 filter"
    />

    <div class="flex min-h-screen items-center justify-center">
      <div
        class="mt-38 mb-38 relative m-4 mx-auto max-w-sm rounded-md border-gray-700 bg-white bg-opacity-70 p-6 shadow-gray-500"
      >
        <div class="flex flex-col items-center">
          <div class="flex items-center">
            <h1 class="font-trocchi text-4xl font-bold">Roamer</h1>
            <img src="/logo.png" alt="" class="ml-2 mr-3 h-12" />
          </div>
          <div class="flex items-center">
            <h1 class="mr-3 text-lg font-bold">by</h1>
            <h1 class="font-trocchi text-lg font-bold">Leo</h1>
            <img
              src="/about-photos/logos/logo_v5.png"
              alt=""
              class="ml-2 h-8"
            />
          </div>
          <br />
          {#if loggedIn}
            <Heading
              tag="h1"
              class="mb-3 flex justify-center"
              customSize="text-2xl font-medium "
            >
              Hey there,
              <p class="ml-2"><strong>{data.username}</strong>!</p>
            </Heading>
            <br />
            <div class="flex flex-col">
              <a
                href="/dashboard"
                class="mt-3 rounded-md bg-log-in-green px-28 py-3 text-center text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
              >
                Dashboard
              </a>

              <a
                href="/search"
                class="mt-3 rounded-md bg-log-in-green px-28 py-3 text-center text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
              >
                Search
              </a>

              <a
                href="/approvals"
                class="mt-3 rounded-md bg-log-in-green px-28 py-3 text-center text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
              >
                Approvals
              </a>
              <form method="post">
                <button
                  type="submit"
                  class="mt-3 w-80 rounded-md bg-red-800 px-28 py-3 text-white shadow transition duration-300 ease-in-out hover:bg-red-500"
                  >Sign Out</button
                >
              </form>
            </div>
          {:else if !loggedIn}
            <div class="flex flex-col">
              <a
                href="/login"
                class="mt-3 rounded-md bg-log-in-green px-28 py-3 text-center text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
                >Sign In</a
              >

              <p class="mb-3 mt-5 flex justify-center text-lg font-semibold">
                Don't have an account yet?
              </p>
              <a
                href="/register"
                class="mt-3 rounded-md bg-log-in-green px-28 py-3 text-center text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
                >Register</a
              >
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="absolute inset-x-0 bottom-0">
    <Footer>
      <p
        class="flex justify-center bg-green-950 text-sm font-medium text-white"
      >
        Want to know more about us? <a href="/about" class="ml-1 underline">
          Click here.</a
        >
      </p>
      <p
        class="flex justify-center bg-green-950 text-sm font-medium text-white"
      >
        Ⓒ 2024 Roamer. All Rights Reserved.
      </p>
    </Footer>
  </div>
</div>
