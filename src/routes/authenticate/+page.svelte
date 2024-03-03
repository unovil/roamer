<script lang="ts">
  import Login from "../../components/Login.svelte";
  import Register from "../../components/Register.svelte";

  export let form;

  let showRegister = false;
</script>

{#if showRegister}
  <Register action="/authenticate?/register" />
  <button
    on:click={() => {
      showRegister = false;
    }}
    >Registered already? Sign in here.
  </button>
{:else}
  <Login {form} action="/authenticate?/login" />
  <button
    on:click={() => {
      showRegister = true;
    }}
    >Not registered yet? Sign up here.
  </button>
{/if}
