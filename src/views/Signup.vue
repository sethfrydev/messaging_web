<template>
  <div class="signup-container">
    <h2>Create an Account</h2>
    <form @submit.prevent="handleSignup">
      <input type="text" placeholder="Username" v-model="username" required />
      <input type="email" placeholder="Email" v-model="email" required />
      <input type="password" placeholder="Password" v-model="password" required />

      <!-- Error Message Display -->
      <ul v-if="errorMessages.length" class="error-messages">
        <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li>
      </ul>

      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessages: [], // Array to store error messages
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, {
          user: {
            username: this.username,
            email: this.email,
            password: this.password,
          },
        });

        console.log(response.data);

        // Show success message
        alert("Account created successfully! Please login to your account.");

        // Redirect to the login page
        this.$router.push("/login");
      } catch (error) {
        // Extract and display error messages
        this.errorMessages =
          error.response?.data?.errors || ["An error occurred. Please try again."];

        // Hide the error messages after 7 seconds
        setTimeout(() => {
          this.errorMessages = [];
        }, 7000);
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

form {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error-messages {
  color: #d8000c;
  background-color: #ffbaba;
  padding: 10px;
  border-radius: 4px;
  margin-top: -10px;
  margin-bottom: 10px;
  list-style-type: none;
  text-align: left;
  font-size: 0.9rem;
}
</style>
