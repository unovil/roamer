<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";
  import { Button } from "flowbite-svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  export let data: PageData;
  let searchTerm: string | null = null;
  let searchCategory: string;
</script>

<svelte:head>
  <title>Roamer | Dashboard</title>
</svelte:head>

<div class="flex h-full w-full flex-col items-center p-4 text-center">

    <main>
      <h1 class="text-6xl font-semibold">
        Welcome, <strong>{data.userInfo.firstName}</strong>!
      </h1>
      <h1 class="m-4 mt-3 text-3xl font-semibold">
        Looking for something to roam about?
      </h1>

      <form
        on:submit|preventDefault={() => {
          const { query, term } = searchQuery(
            searchTerm,
            searchCategory,
            $page,
          );
          searchTerm = term;
          if (query != "") goto(`/search?${query}`);
        }}
      >
        <div class="flex w-full justify-between">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search..."
            class="mb-2 mr-2 w-full flex-grow rounded-md border border-gray-300 p-2 shadow"
          />
          <select
            name="searchCategory"
            bind:value={searchCategory}
            class="mb-2 mr-2 flex rounded-md border border-gray-300 p-2 shadow"
          >
            <option value="facility">Facility</option>
            <option value="equipment">Equipment</option>
          </select>
          <input
            type="submit"
            value="Search"
            class="mb-2 flex rounded-md border border-gray-300 bg-log-in-green p-2 text-white shadow transition duration-300 ease-in-out hover:bg-green-500"
          />
        </div>
      </form>
    </main>
  </div>
  <div class = "mx-32">
  <div class="mt-20 flex justify-between mx-5">
    <div class="mr-2 w-3/4 h-screen rounded-md border border-gray-300 p-4 shadow">
      <Table hoverable={true}>
        <caption
          class=" mb-5 text-center text-3xl font-bold text-green-900 dark:text-green-300"
        >Section: {data?.sectionInfo?.section ?? "null"}</caption>
      
      <TableHead>
        <TableHeadCell class = "text-base">Student</TableHeadCell>
    <TableHeadCell class = "text-base">LRN</TableHeadCell>
      </TableHead>
       
      <TableBody>
        
        {#each data?.sectionInfo?.students ?? [] as student (student.id)}
        <TableBodyRow class = "text-black font-medium">
            <td>
              {student.user.firstName + " " + student.user.lastName}
              {#if student.user.id == data.userInfo.id}
                <span class="italic text-gray-600">(You)</span>
              {/if}
            </td >
            <td>{student.lrn}</td>
          </TableBodyRow>
        {/each}
      </TableBody>
      </Table>
    </div>

    <div class="ml-2 w-3/4 h-screen rounded-md border border-gray-300 p-4 shadow">
      <caption
          class=" mb-5 text-center text-3xl font-bold text-green-900 dark:text-green-300 flex justify-center"
        >Recent Bookings: </caption>
      <Table hoverable={true} Tableclass="space-y-10">
        {#if data?.mappedRequests && data?.mappedRequests.length > 0}
          {#each data?.mappedRequests as request}
          <TableBodyRow>
            <td class="pr-1 w-1/4">
                <img
                  src={request.item?.image}
                  class="h-24"
                  alt={request.item?.name}
                />
              </td>
              
              <td>
                  <p class = "font-semibold text-black">{request.item?.name}</p>
                  <span class={request.status.class}>{request.status.name}</span
                  >
                </td>
              </TableBodyRow>
          {/each}
        {/if}
      </Table>
      <div class="flex justify-center items-center">
        <Button color="green" pill class="mt-5">
          <a href="/approvals">See other roams ></a>
        </Button>
      </div>
    </div>
</div>
</div>