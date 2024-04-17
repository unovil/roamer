<script lang="ts">
    import { page } from "$app/stores";
</script>

<!-- request error -->
{#if $page.status === 404}
<h1>404</h1>
<p>Sorry, the page you requested does not exist.</p>

{:else if $page.status === 400}
<h1>400</h1>
<p>Sorry, you may have made a bad request. Retype the URL or go back to the homepage.</p>

<!-- unauthorized error -->
{:else if $page.status === 401}
<h1>504</h1>
<p>Sorry, you are not authorized to view this page.</p>

<!-- general error -->
{:else}
<h1>{$page.status}</h1>
<p>{$page?.error?.message}</p>
{/if}