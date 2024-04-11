<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import type { ActionResult } from "@sveltejs/kit";
    import type { ActionData } from "./$types";
    import type { PageData } from "./$types";
    import { Department } from "@prisma/client";
  
    export let form: ActionData;
    export let data: PageData;
  
    let admins: typeof data.admins = [];
    let chosenAdminEmail = "";
    let chosenAdmin: number;
  
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
    const addChosenAdmin = (event: Event) => {
      if (!chosenAdmin) return;
      const foundAdmin = data.admins.find((admin) => admin.id === chosenAdmin);
      if (typeof foundAdmin === "undefined" || foundAdmin == null) return;
  
      admins = [...admins, foundAdmin];
      chosenAdminEmail = "";
    };
  
    $: chosenAdminEmail =
      data.admins.find((admin) => admin.id === chosenAdmin)?.user.email || "";
    $: if (
      data?.adminInfo?.id &&
      !admins.map((admin) => admin.id).includes(data.adminInfo.id)
    ) {
      admins = [...admins, data?.adminInfo];
    }
  
    $: console.log(form);
  </script>
  
  {#if form?.error}
    <p>{form.error}</p>
  {/if}
  
  <h1>Add an equipment.</h1>
  
  <form
    method="post"
    use:enhance={({ formData }) => {
      formData.append("admins", JSON.stringify(admins.map((admin) => admin.id)));
  
      return async({ update }) => {
        await update();
      };
    }}
    enctype="multipart/form-data"
  >
    <h3>Add a title.</h3>
    <input type="text" name="title" placeholder="Facility Name" />
    <br />
  
    <h3>Add administrators.</h3>
    <table>
      <tr>
        <th>Administrator</th>
        <th>Email</th>
        <th></th>
      </tr>
      {#each admins as admin (admin.id)}
        <tr>
          <td>
            {admin.user.lastName}, {admin.user.firstName}
            {#if admin.id === data?.adminInfo?.id}
              <span class="text-gray-600 italic">(You)</span>
            {/if}
          </td>
          <td>{admin.user.email}</td>
          <td></td>
        </tr>
      {/each}
      {#if data.admins.filter((admin) => {
        return admin.id !== data?.adminInfo?.id && !admins.find((a) => a.id === admin.id);
      }).length != 0}
        <tr>
          <td>
            Add an administrator... <br />
            <select bind:value={chosenAdmin}>
              <option value="" selected disabled></option>
              {#each data.admins.filter((admin) => {
                return admin.id !== data?.adminInfo?.id && !admins.find((a) => a.id === admin.id);
              }) as admin (admin.id)}
                <option value={admin.id}>
                  {admin.user.lastName.toUpperCase()}, {admin.user.firstName}
                </option>
              {/each}
            </select>
          </td>
          <td>{chosenAdminEmail}</td>
          <td><button on:click|preventDefault={addChosenAdmin}>Add</button></td>
        </tr>
      {/if}
    </table>
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
  