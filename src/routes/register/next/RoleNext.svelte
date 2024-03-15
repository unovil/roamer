<script lang="ts">
    let formData: FormData;
    export let roleSelected: string;
</script>

{#if roleSelected == "admin"}

{:else if roleSelected == "student"}
<p>What school are you a part of?</p>
<input type="text" name="school">

<p>What is your LRN?</p>
<input type="text" name="lrn">

{/if}