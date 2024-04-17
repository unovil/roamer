<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

Name
<h1>{data.equipment.name}</h1>
<br>
Admins
<p>{data.equipment.admins.map(admin => {
    return admin.user.firstName + " " + admin.user.lastName
  }).join(", ")}</p>
<br>
Department
<p>{data.equipment.department}</p>
<br>
Description
<p>{data.equipment.description}</p>