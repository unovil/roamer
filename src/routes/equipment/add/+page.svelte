<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { ActionResult } from "@sveltejs/kit";
  import type { ActionData } from "./$types";
  import type { PageData } from "./$types";
  import { Department } from "@prisma/client";
  import { Heading, Table, Button } from "flowbite-svelte";

  export let form: ActionData;
  export let data: PageData;

  let filteredAdmins = new Array<(typeof data.admins)[0]>();
  let searchName: string = "";
  let searchEmail: string = "";
  let selectAll: boolean = false;
  let checkedAdminIds: Set<number> = new Set([data.adminInfo.id]);

  let previewUrl = "";
  const onFileChange = (event: Event) => {
    const fileElement = event?.target as HTMLInputElement;
    const file = fileElement.files ? fileElement.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  $: {
    filteredAdmins = Object.values(data.admins)
      .filter((student) => {
        return (
          `${student.user.firstName.toLowerCase()} ${student.user.lastName.toLowerCase()}`.includes(
            searchName.toLowerCase(),
          ) &&
          student.user.email.toLowerCase().includes(searchEmail.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (a.id === data.adminInfo.id) return -1;
        if (b.id === data.adminInfo.id) return 1;

        if (a.user.lastName < b.user.lastName) return -1;
        if (a.user.lastName > b.user.lastName) return 1;

        if (a.user.firstName < b.user.firstName) return -1;
        if (a.user.firstName > b.user.firstName) return 1;

        if (a.user.email < b.user.email) return -1;
        if (a.user.email > b.user.email) return 1;

        return 0;
      });
  }

  const toggleCheck = (id: number, checkedSet: Set<number>) => {
    let newSet = new Set(checkedSet);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }

    return newSet;
  };

  const toggleAll = () => {
    if (selectAll) {
      filteredAdmins.forEach((admin) => {
        if (admin.id === data.adminInfo.id) return;
        checkedAdminIds.add(admin.id);
      });
    } else {
      filteredAdmins.forEach((admin) => {
        if (admin.id === data.adminInfo.id) return;
        checkedAdminIds.delete(admin.id);
      });
    }

    checkedAdminIds = checkedAdminIds;
  };

  const checkWhetherSelectedAll = () => {
    selectAll = filteredAdmins.every((admin) => checkedAdminIds.has(admin.id));
  };
</script>

<svelte:head>
  <title>Roamer | Equipment (Addition)</title>
</svelte:head>

<div class="mx-auto flex max-w-screen-lg flex-col">
  <Heading
    tag="h1"
    customSize="text-5xl font-extrabold"
    class="mb-8 mt-8 flex justify-center"
  >
    Add an equipment
  </Heading>
  {#if form?.error}
    <p class="flex justify-center text-base font-semibold text-red-600">
      {form.error}
    </p>
  {/if}

  <form
    method="post"
    use:enhance={({ formData }) => {
      formData.append("admins", JSON.stringify([...checkedAdminIds]));

      return async ({ update }) => {
        await update();
      };
    }}
    enctype="multipart/form-data"
  >
    <h3 class="p-3 text-left text-3xl font-bold text-gray-900 dark:text-white">
      Add a title
    </h3>
    <input
      type="text"
      name="title"
      placeholder="Equipment Name"
      class="w-full rounded-md shadow"
    />
    <br />
    <h3 class="p-3 text-left text-3xl font-bold text-gray-900 dark:text-white">
      Add administrators
    </h3>
    <Table class="h-full shadow-md">
      <div class="max-h-[300px] overflow-auto">
        <table>
          <thead>
            <tr class="sticky top-0 bg-white">
              <th class="text-center">
                <div class="mr-1 text-lg text-black">Select</div>
                <div class="ml-0">
                  <input
                    type="checkbox"
                    bind:checked={selectAll}
                    on:change={toggleAll}
                  />
                </div>
              </th>
              <th class="text-center">
                <div class="text-lg text-black">Name</div>
                <div>
                  <input
                    type="text"
                    placeholder="Filter by name..."
                    class="w-full rounded-md text-left font-normal"
                    bind:value={searchName}
                    on:input={checkWhetherSelectedAll}
                  />
                </div>
              </th>
              <th class="text-center">
                <div class="text-lg text-black">Email</div>
                <div>
                  <input
                    type="text"
                    placeholder="Filter by email..."
                    class="w-full rounded-md text-left font-normal"
                    bind:value={searchEmail}
                    on:input={checkWhetherSelectedAll}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {#each Object.values(filteredAdmins) as admin (admin.id)}
              <tr>
                <td>
                  <input
                    type="checkbox"
                    class="ml-4 text-green-500"
                    checked={checkedAdminIds.has(admin.id)}
                    disabled={admin.id === data.adminInfo.id}
                    on:change={() =>
                      (checkedAdminIds = toggleCheck(
                        admin.id,
                        checkedAdminIds,
                      ))}
                  />
                </td>
                <td class="text-base text-black">
                  {admin.user.lastName}, {admin.user.firstName}
                </td>
                <td class="text-base text-black">{admin.user.email}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Table>
    <br />

    <h3 class="p-3 text-left text-3xl font-bold text-gray-900 dark:text-white">
      Add description
    </h3>
    <textarea
      name="description"
      cols="30"
      rows="10"
      placeholder="Description"
      class="h-80 w-full rounded-md border-gray-400 shadow"
    />
    <br />

    <h3 class="p-3 text-left text-3xl font-bold text-gray-900 dark:text-white">
      Attach an image
    </h3>
    <div class="flex justify-center">
      <input
        type="file"
        name="file"
        class="w-full rounded-md shadow"
        accept=".jpg, .jpeg, .png, .webp"
        on:change={onFileChange}
      />
      {#if previewUrl}
        <img src={previewUrl} alt="Preview" class="h-24" />
      {/if}
    </div>

    <h3 class="p-3 text-left text-3xl font-bold text-gray-900 dark:text-white">
      Add department
    </h3>
    <select
      name="department"
      class="w-full rounded-md border-gray-600 shadow-md"
    >
      <option value="" selected disabled>Department</option>
      <option>GENERALPURPOSE</option>
      <option>MAPEH</option>
      <option>SCIENCE</option>
      <option>MULTIMEDIA</option>
      <option>MISCELLANEOUS</option>
    </select>

    <br />
    <div class="mb-20 mt-20 flex justify-center">
      <Button color="green" pill type="submit" size="xl"
        >Add an equipment</Button
      >
    </div>
  </form>
</div>
