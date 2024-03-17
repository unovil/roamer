<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<p>Sample dashboard here.</p>
<p>If you can see this page, you are logged in.</p>

<p>Logout? Click the button.</p>
<form method="post">
  <button type="submit">LOGOUT</button>
</form>

<p>Your name is: "{data.username}"</p>
