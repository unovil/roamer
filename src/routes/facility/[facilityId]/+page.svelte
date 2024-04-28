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
  <div
    class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col items-center"
  >
    <div class="flex items-start">
      <div
        class="grid grid-cols-2 grid-rows-1 bg-white text-center"
        style="grid-template-columns: 20% 20% 60%;"
      >
        <img class="ml-0 h-20 w-20" src={`/${data.facility.image}`} alt="" />

        <div class="mx-1">
          <h1>{data.facility.name}</h1>

          <p class="font-semibold">
            Admin: {#each admins as admin (admin.id)}
              <p>
                {admin.user.firstName + " " + admin.user.lastName}
                <i>({admin.user.email})</i>
              </p>
            {/each}
          </p>

          <p class="font-semibold">Department: {data.facility.department}</p>
        </div>
        <a
          href={`${$page.url}/booking`}
          class="ml-auto mt-5 rounded bg-log-in-green px-4 py-2 font-bold text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
        >
          Roam
        </a>
      </div>
    </div>
    <br />
    {#if data.isBookSuccess}
      <p class="ml-96">Booking success!</p>
    {/if}
    <div
      class=" mt-4 grid h-full w-4/5 grid-cols-2 gap-4 rounded border border-gray-300 p-4 shadow"
    >
      <div>
        <h2 class="text-xl font-bold text-log-in-green">Blocked Dates</h2>
        {#each blockedDates as date}
          <p>
            {new Date(date.start).toLocaleString()} - {new Date(
              date.end,
            ).toLocaleString()}
          </p>
        {/each}
      </div>

      <div>
        <h2 class="text-xl font-bold text-log-in-green">Description</h2>
        <p>{data.facility.description}</p>
      </div>
    </div>
  </div>
</div>
