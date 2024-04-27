<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  const blockedDates = Array.isArray(data.facility.blockedDates)
    ? data.facility.blockedDates
    : [];
  const admins = Array.isArray(data.facility.admins)
    ? data.facility.admins
    : [];
</script>

<div
  class="grid h-screen grid-cols-3 grid-rows-8 bg-white text-center"
  style="grid-template-columns: 15% 70% 15%;"
>
  <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col  items-center">
    <div class="flex items-start">
      <div
  class="grid grid-cols-2 grid-rows-1 bg-white text-center"
  style="grid-template-columns: 20% 20% 60%;"
>
      <img class="w-20 h-20 ml-0" src={`/${data.facility.image}`} alt="" />

      <div class ="mx-1">
        <h1>{data.facility.name}</h1>
        
        <p class = "font-semibold">Admin: {#each admins as admin (admin.id)}
          <p>
            {admin.user.firstName + " " + admin.user.lastName}
            <i>({admin.user.email})</i>
          </p>
        {/each}</p>
        
        <p class = "font-semibold">Department: {data.facility.department}</p>

        
      </div>
      <a href={`${$page.url}/booking`} class="ml-auto mt-5 bg-log-in-green  text-white shadow transition duration-300 ease-in-out hover:bg-green-500 font-bold py-2 px-4 rounded">Roam</a>
    </div>
</div>
    <br />
    {#if data.isBookSuccess}
    <p class ="ml-96">Booking success!</p>
  {/if}
    <div class=" shadow p-4 border border-gray-300 rounded grid grid-cols-2 gap-4 mt-4 w-4/5 h-full">
      <div>
        <h2 class = "font-bold text-xl text-log-in-green">Blocked Dates</h2>
        {#each blockedDates as date}
          <p>
            {new Date(date.start).toLocaleString()} - {new Date(
              date.end,
            ).toLocaleString()}
          </p>
        {/each}
      </div>

      <div>
        <h2 class = "font-bold text-xl text-log-in-green">Description</h2>
        <p>{data.facility.description}</p>
      </div>
    </div>
  </div>
</div>