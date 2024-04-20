<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { ActionResult } from "@sveltejs/kit";
  import type { ActionData } from "./$types";
  import type { PageData } from "./$types";
  import { Department } from "@prisma/client";

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
            searchName.toLowerCase()
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
    selectAll = filteredAdmins.every((admin) =>
      checkedAdminIds.has(admin.id)
    );
  };
</script>

{#if form?.error}
  <p>{form.error}</p>
{/if}

<h1>Add a equipment.</h1>

<form
  method="post"
  use:enhance={({ formData }) => {
    formData.append("admins", JSON.stringify([...checkedAdminIds]));

    return async({ update }) => {
      await update();
    };
  }}
  enctype="multipart/form-data"
>
  <h3>Add a title.</h3>
  <input type="text" name="title" placeholder="Equipment Name" />
  <br />

  <h3>Add administrators.</h3>
  <div class="max-h-[250px] overflow-auto">
    <table>
      <thead>
        <tr class="sticky top-0 bg-white">
          <th class="text-left">
            <div>Select</div>
            <div>
              <input
                type="checkbox"
                bind:checked={selectAll}
                on:change={toggleAll}
              />
            </div>
          </th>
          <th class="text-left">
            <div>Administrator</div>
            <div>
              <input
                type="text"
                placeholder="Filter by name..."
                class="font-normal text-left w-full"
                bind:value={searchName}
                on:input={checkWhetherSelectedAll}
              />
            </div>
          </th>
          <th class="text-left">
            <div>Email</div>
            <div>
              <input
                type="text"
                placeholder="Filter by email..."
                class="font-normal text-left w-full"
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
                checked={checkedAdminIds.has(admin.id)}
                disabled={admin.id === data.adminInfo.id}
                on:change={() =>
                  (checkedAdminIds = toggleCheck(
                    admin.id,
                    checkedAdminIds
                  ))}
              />
            </td>
            <td>{admin.user.lastName}, {admin.user.firstName}</td>
            <td>{admin.user.email}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <br />

  <h3>Add a description.</h3>
  <textarea name="description" cols="30" rows="10" placeholder="Description" />
  <br />

  <h3>Attach images.</h3>
  <input
    type="file"
    name="file"
    accept=".jpg, .jpeg, .png, .webp"
    on:change={onFileChange}
  />
  {#if previewUrl}
    <img src={previewUrl} alt="Preview" class="h-24" />
  {/if}

  <h3>Add a department.</h3>
  <select name="department">
    <option value="" selected disabled>Department</option>
    {#each Object.values(Department) as department}
      <option>{department}</option>
    {/each}
  </select>

  <br />
  <button type="submit">Add a faculty</button>
</form>
