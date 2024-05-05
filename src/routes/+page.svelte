<script lang="ts">
  import { page } from "$app/stores";
    import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { Heading } from "flowbite-svelte";
  import { Footer } from 'flowbite-svelte';

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
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url({images[currentImageIndex]}); filter: brightness(50%);">
      <div class="fixed inset-x-0 bottom-0 flex justify-center items-center">
        <Footer>
          <p class = "text-white text-sm font-medium"> Want to know more about us? <a href = '/about' class = "ml-1"> Click here.</a></p>
          <p class = "text-white text-sm font-medium flex justify-center"> Ⓒ 2024 Roamer All Rights Reserved.</p>
        </Footer>
      </div>
    </div>
    
    <div class="flex items-center justify-center min-h-screen">
      <div class="relative mt-38 mb-38 m-4 max-w-sm mx-auto rounded-md p-6 border-gray-700 shadow-gray-500 bg-white bg-opacity-70">
      <div class="flex flex-col items-center">
        <div class="flex items-center">
          <h1 class="font-trocchi text-4xl font-bold">Roamer</h1>
          <img src="/logo.png" alt="" class="ml-2 mr-3 h-12" />
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
            class="mb-3 flex justify-center"
            customSize="text-2xl font-medium "
          >
            Hey there,
            <p class="ml-2"><strong>{data.username}</strong>!</p></Heading
          >
          <br />
          <div class="flex flex-col">
            <button class = "mt-3 rounded-md bg-log-in-green px-28 py-3 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"> <a href = '/dashboard'> Dashboard</a> </button>
            <button class = "mt-3 rounded-md bg-log-in-green px-28 py-3 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"> <a href = '/search'> Search</a> </button>
            <button class = "mt-3 rounded-md bg-log-in-green px-28 py-3 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"> <a href = '/approvals'> Approvals</a> </button>
            <form method="post">
              <button type="submit" class = "mt-3 rounded-md bg-red-800 px-28 py-3 text-white shadow transition duration-300 ease-in-out hover:bg-red-500 w-80">Sign Out</button>
            </form>
            
          </div>
        {:else if !loggedIn}
          <div class="flex flex-col">
            <button class = "mt-3 rounded-md bg-log-in-green px-28 py-3 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"> <a href = '/login'> Sign In</a> </button>
            <p class="mb-3 mt-5 flex justify-center text-lg font-semibold">
              Don't have an account yet?
            </p>
            <button class = "mt-3 rounded-md bg-log-in-green px-28 py-3 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"> <a href = '/register'> Register</a> </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
</div>