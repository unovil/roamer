<script lang="ts">
  export let action: string;
</script>

<form method="post" {action}>
  <input type="email" placeholder="Email address" name="email" />
  <br />
  <input type="text" placeholder="First name" name="firstName" />
  <br />
  <input type="text" placeholder="Middle name" name="middleName" />
  <br />
  <input type="text" placeholder="Last name" name="lastName" />
  <br />
  <input type="password" placeholder="Password" name="password" />
  <br />
  <button type="submit">Register</button>
</form>
