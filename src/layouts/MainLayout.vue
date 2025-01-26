<template>
  <div class="layout-wrapper">
    <header class="layout-header">
      <h1>Messaging App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <template v-if="!authState.isLoggedIn">
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">Signup</router-link>
        </template>
        <template v-else>
          <router-link to="/dashboard">Dashboard</router-link>
          <span>Welcome, {{ authState.user?.username || 'User' }}</span>
          <a href="#" @click.prevent="handleLogout">(Logout)</a>
        </template>
      </nav>
    </header>
    <main class="layout-content">
      <router-view />
    </main>
    <footer class="layout-footer">
      <p>&copy; 2025 Messaging App</p>
    </footer>
  </div>
</template>

<script>
import { authState, logout } from "../store/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const handleLogout = () => {
      logout(router); // Use the router-aware logout function
    };

    return {
      authState,
      handleLogout,
    };
  },
};
</script>

<style>

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
}

.layout-wrapper {
  width: 980px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  width: 100%;
  background-color: #42b983;
  padding: 1rem;
  text-align: center;
  color: white;
}

.layout-header nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
}

.layout-header nav a:hover {
  text-decoration: underline;
}

.layout-content {
  flex: 1;
  padding: 1rem 0;
  text-align: center;
}

.layout-footer {
  width: 100%;
  background-color: #f5f5f5;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #666;
}
</style>
