<script lang="ts">
  import { page } from "$app/stores";
    import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { Heading, Button } from "flowbite-svelte";
  import { Footer, FooterBrand, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup } from 'flowbite-svelte';

  export let data: PageData;

  let loggedIn: boolean;
  let userRole: string;
  if (data.isLoggedIn) {
    loggedIn = true;
  } else loggedIn = false;
  console.log(`loggedIn status is: ${loggedIn}`);

  let images = [
    'https://st.depositphotos.com/1003098/3442/i/450/depositphotos_34422961-Teacher-Using-Computer-With-Students-In-Classroom.jpg',
    'https://wpvip.edutopia.org/wp-content/uploads/2022/10/BP5AM3.jpg?w=2880&quality=85',
    'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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

<div class="flex flex-col min-h-screen">
  <div class="flex-grow">
    <div class="absolute inset-0" style="background-image: url({images[currentImageIndex]}); background-size: cover; filter: brightness(50%);">
      <div class="fixed inset-x-0 bottom-0 flex justify-center items-center">
        <Footer>
          <p class = "text-white text-sm font-medium"> Want to know more about us? <a href = '/about' class = "ml-1"> Click here.</a></p>
          <p class = "text-white text-sm font-medium flex justify-center"> Ⓒ 2024 Roamer All Rights Reserved.</p>
        </Footer>
      </div>
    </div>
    
    <div class="relative mt-44 m-4 w-1/4 mx-auto rounded-md p-6 border-gray-700 shadow-gray-500 bg-white bg-opacity-70">
      <div class="flex flex-col items-center">
        <div class="flex items-center">
          <h1 class="font-trocchi text-4xl font-bold">Roamer</h1>
          <img src="/logo.png" alt="" class="ml-2 mr-3 h-8" />
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 text-lg font-bold">by</h1>
          <h1 class="font-trocchi text-lg font-bold">Leo</h1>
          <img src="/about-photos/logos/logo_v5.png" alt="" class="ml-2 h-8" />
        </div>
        <br />
        {#if loggedIn}
          <Heading
            tag="h1"
            class="mb-4 flex justify-center"
            customSize="text-2xl font-medium "
          >
            Hey there,
            <p class="ml-2"><strong>{data.username}</strong>!</p></Heading
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
            <p class="mb-3 mt-5 flex justify-center text-lg font-semibold">
              Don't have an account yet?
            </p>
            <Button color="green" href="/register" size="lg">Register</Button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>