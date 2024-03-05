<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex h-screen">
  <div class="m-auto">
    <h1 class="font-bold text-4xl">Hello World!</h1>
    <p>
      Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
    </p>

    <br />

    <p>Go to this link to login: <a href="/login">Login</a></p>
  </div>
</div>
