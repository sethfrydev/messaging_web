<template>
  <div class="dashboard-container">
    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="success-banner">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="error-banner">
      {{ errorMessage }}
    </div>

    <!-- Header -->
    <header class="dashboard-header">
      <h1>Inbox</h1>
      <button class="compose-button" @click="openComposeModal">Compose Message</button>
    </header>

    <!-- Tabs -->
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: selectedTab === 'received' }"
        @click="selectedTab = 'received'"
      >
        Received
      </button>
      <button
        class="tab"
        :class="{ active: selectedTab === 'sent' }"
        @click="selectedTab = 'sent'"
      >
        Sent
      </button>
    </div>

    <!-- Messages List -->
    <MessageList
      :messages="filteredMessages"
      :tab="selectedTab"
      @delete="deleteMessage"
    />

    <!-- Compose Message Modal -->
    <ComposeMessage
      :isOpen="isComposeModalOpen"
      @close="closeComposeModal"
      @send="handleSendMessage"
    />
  </div>
</template>

<script>
import { authState } from "../store/auth"; // Use global auth state
import apiClient from "../services/api"; // Centralized API client
import MessageList from "../components/MessageList.vue";
import ComposeMessage from "../components/ComposeMessage.vue";

export default {
  components: {
    MessageList,
    ComposeMessage,
  },
  data() {
    return {
      messages: [],
      isComposeModalOpen: false,
      selectedTab: "received", // Default tab
      errorMessage: null,
      successMessage: null,
    };
  },
  computed: {
    currentUserId() {
      return authState.user?.id || null; // Current user's ID
    },
    filteredMessages() {
      if (this.selectedTab === "received") {
        return this.messages.filter(
          (msg) => msg.receiver_id === this.currentUserId
        );
      } else {
        return this.messages.filter((msg) => msg.sender_id === this.currentUserId);
      }
    },
  },
  async created() {
    try {
      // Fetch messages
      const response = await apiClient.get("/messages");
      this.messages = response.data;
    } catch (error) {
      this.errorMessage = "Failed to fetch messages. Please log in again.";
      setTimeout(() => (this.errorMessage = null), 7000);
    }
  },
  methods: {
    openComposeModal() {
      this.isComposeModalOpen = true;
    },
    closeComposeModal() {
      this.isComposeModalOpen = false;
    },
    async handleSendMessage(newMessage) {
      try {
        await apiClient.post("/messages", newMessage);
        this.successMessage = "Message sent successfully!";
        
        this.isComposeModalOpen = false;

        // Refresh messages
        const response = await apiClient.get("/messages");
        this.messages = response.data;

        setTimeout(() => (this.successMessage = null), 7000);
      } catch (error) {
        // Extract error messages from the response if available
        this.errorMessage = error.response?.data?.errors?.join(", ") || "Failed to send message. Please try again.";

        this.isComposeModalOpen = false;
        setTimeout(() => (this.errorMessage = null), 7000);
      }
    },
    async deleteMessage(messageId) {
      try {
        await apiClient.delete(`/messages/${messageId}`);
        this.successMessage = "Message deleted successfully!";
        
        // Refresh messages after soft delete
        const response = await apiClient.get("/messages");
        this.messages = response.data;

        setTimeout(() => (this.successMessage = null), 7000);
      } catch (error) {
        this.errorMessage = "Failed to delete message. Please try again.";
        setTimeout(() => (this.errorMessage = null), 7000);
      }
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.compose-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.compose-button:hover {
  background-color: #45a049;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #f9f9f9;
  border: none;
}

.tab.active {
  background-color: #4caf50;
  color: white;
}

.tab:not(.active):hover {
  background-color: #e0e0e0;
  color: #333;
}

.success-banner {
  color: #155724;
  background-color: #d4edda;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1rem;
}

.error-banner {
  color: #d8000c;
  background-color: #ffbaba;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1rem;
}
</style>
