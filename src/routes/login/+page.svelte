<script lang="ts">
  let loginData = {
    email: "",
    password: "",
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(loginData);
  };
</script>

<form method="post" on:submit={handleSubmit}>
  <label for="email" hidden>Email address</label>
  <input
    name="email"
    type="email"
    bind:value={loginData.email}
    placeholder="Email address"
  /> <br>
  <label for="password" hidden>Password</label>
  <input
    name="password"
    type="password"
    bind:value={loginData.password}
    placeholder="Password"
  /> <br>
  <button type="submit">Login</button>
</form>
