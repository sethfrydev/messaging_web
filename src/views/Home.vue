<template>
  <div class="home-content">
    <h1>Welcome to the Messaging App</h1>
    <p v-if="!authState.isLoggedIn">
      <router-link to="/login">Login</router-link> or
      <router-link to="/signup">Signup</router-link> to get started!
    </p>
    <p v-else>
      You are already logged in. Go to your 
      <router-link to="/dashboard">Dashboard</router-link>.
    </p>    
  </div>
</template>

<script>
import { authState } from "../store/auth";

export default {
  name: "Home",
  setup() {
    return { authState };
  },
};
</script>

<style>
.home-content {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
