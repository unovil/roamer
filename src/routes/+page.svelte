<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<br>

<p>By the way, these are the results:</p>
{#each data.users as user (user.email)}
    <p>{user.email}</p>
{/each}