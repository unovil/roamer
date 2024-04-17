<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

Name
<h1>{data.facility.name}</h1>
<br>
Admins
<p>{data.facility.admins.map(admin => {
    return admin.user.firstName + " " + admin.user.lastName
  }).join(", ")}</p>
<br>
Department
<p>{data.facility.department}</p>
<br>
Description
<p>{data.facility.description}</p>