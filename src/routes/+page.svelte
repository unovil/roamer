<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  let loggedIn: boolean;

  if (data.isLoggedIn) {
    loggedIn = true;
  } else loggedIn = false;

  console.log(`loggedIn status is: ${loggedIn}`);
</script>

<svelte:head>
  <title>Roamer</title>
</svelte:head>

<div class="flex h-screen">
  <div class="m-auto">
    <h1 class="text-4xl font-bold">Hello World!</h1>
    <p>
      Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a>
      to read the documentation
    </p>

    <br />

    <p>
      Go to this link to login: <a href="/login">Login</a>
    </p>
    <p>Are you logged in? {loggedIn}</p>

    {#if loggedIn}
      <p>Logout? Click the button.</p>
      <form method="post">
        <button type="submit">LOGOUT</button>
      </form>

      <p>Your name is: "{data.username}"</p>
    {/if}
  </div>
</div>
