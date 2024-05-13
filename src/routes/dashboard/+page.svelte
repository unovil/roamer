<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { searchQuery } from "$lib/components/search";
  import { Button } from "flowbite-svelte";
  import {
    Table,
    TableBody,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";

  export let data: PageData;
  let searchTerm: string | null = null;
  let searchCategory: string;
</script>

<svelte:head>
  <title>Roamer | Dashboard</title>
</svelte:head>

<div
  class="mt-10 flex flex-col items-center px-4 text-center sm:px-8 sm:text-center md:px-16 lg:px-32"
>
  <h1 class="text-4xl font-semibold sm:text-5xl md:text-6xl">
    Welcome, <strong>{data.userInfo.firstName}</strong>!
  </h1>
  <h1
    class="mb-4 mt-3 text-base font-semibold sm:text-xl md:text-2xl lg:text-4xl"
  >
    Looking for something to roam about?
  </h1>

  <form
    on:submit|preventDefault={() => {
      const { query, term } = searchQuery(searchTerm, searchCategory, $page);
      searchTerm = term;
      if (query != "") goto(`/search?${query}`);
    }}
    class="w-full sm:w-3/4 md:w-full"
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
</div>
<div class="mx-4 my-8 flex flex-col justify-between sm:mx-32 sm:flex-row">
  <div
    class="mb-4 w-full rounded-md border border-gray-300 p-4 shadow sm:mb-0 sm:mr-2 sm:w-3/4"
  >
    <Table hoverable={true}>
      <caption
        class="mb-5 flex justify-center text-center text-3xl font-bold text-green-900 dark:text-green-300"
      >
        Section: {data?.sectionInfo?.section ?? "null"}</caption
      >

      <TableHead>
        <TableHeadCell class="text-base">Student</TableHeadCell>
        <TableHeadCell class="text-base">LRN</TableHeadCell>
      </TableHead>

      <TableBody>
        {#each data?.sectionInfo?.students ?? [] as student (student.id)}
          <TableBodyRow class="font-medium text-black">
            <td>
              {student.user.firstName + " " + student.user.lastName}
              {#if student.user.id == data.userInfo.id}
                <span class="italic text-gray-600">(You)</span>
              {/if}
            </td>
            <td>{student.lrn}</td>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div
    class="mt-4 w-full rounded-md border border-gray-300 p-4 shadow sm:ml-2 sm:mt-0 sm:w-3/4"
  >
    <caption
      class=" mb-5 flex justify-center text-center text-3xl font-bold text-green-900 dark:text-green-300"
      >Recent Bookings:
    </caption>
    <Table hoverable={true} Tableclass="space-y-10">
      {#if data?.mappedRequests && data?.mappedRequests.length > 0}
        {#each data?.mappedRequests as request}
          <TableBodyRow>
            <td class="w-1/4 pr-1">
              <img
                src={request.item?.image}
                class="h-24 w-24"
                alt={request.item?.name}
              />
            </td>

            <td>
              <p class="font-semibold text-black">{request.item?.name}</p>
              <span class={request.status.class}>{request.status.name}</span>
            </td>
          </TableBodyRow>
        {/each}
      {/if}
    </Table>
    <div class="flex items-center justify-center">
      <Button color="green" pill class="mt-5">
        <a href="/approvals">See other roams ></a>
      </Button>
    </div>
  </div>
</div>
