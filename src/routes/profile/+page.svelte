<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1>Your current profile:</h1>
<p>{data.user}</p>
