<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { Button } from 'flowbite-svelte';

  export let data: PageData;

  const blockedDates = Array.isArray(data.equipment.blockedDates)
    ? data.equipment.blockedDates
    : [];
  const admins = Array.isArray(data.equipment.admins)
    ? data.equipment.admins
    : [];
</script>

<svelte:head>
  <title>Roamer | Equipment | {data.equipment.name}</title>
</svelte:head>

{#if data.isBookSuccess}
  <p class = "flex justify-center text-3xl font-semibold text-green-500">Booking success!</p>
{/if}

<div class="mx-96 max-w-screen-lg my-6">
  <div class="relative">
    <div class="flex items-center">
      <img src={`/${data.equipment.image}`} alt="" class="h-48 w-48 mr-5"/>
    <div>
      <p class = "font-bold text-log-in-green text-lg"> NAME: </p>
      <h1>{data.equipment.name}</h1>
      <br />
  
      <p class = "font-bold text-log-in-green text-lg"> ADMINS: </p>
      {#each admins as admin (admin.id)}
        <p>
          {admin.user.firstName + " " + admin.user.lastName}
          <i>({admin.user.email})</i>
        </p>
      {/each}
      <br />
  
      <p class = "font-bold text-log-in-green text-lg"> DEPARTMENT: </p>
      <p>{data.equipment.department}</p>
    </div>
    <br />
  
    <div class="absolute top-0 right-10">
      <Button color="green" pill size = "lg">
        <a href={`${$page.url}/booking`}>Roam</a>
      </Button>   
    </div>
  </div>
  </div>
  
  <div class="mt-12 border border-gray-300 p-4 rounded-md">
    <table class="w-3/4 h-screen">
      <tr>
        <td class="align-top">
          <h1 class = "font-bold text-log-in-green text-2xl"> Blocked Dates: </h1>
          {#each blockedDates as date}
            <p>{new Date(date.start).toLocaleString()} - {new Date(date.end).toLocaleString()}</p>
          {/each}
        </td>
        <td class="align-top">
          <h1 class = "font-bold text-log-in-green text-2xl"> Description: </h1>
          <p>{data.equipment.description}</p>
        </td>
      </tr>
    </table>
  </div>
  </div>