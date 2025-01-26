<template>
  <ul v-if="messages.length > 0" class="message-list">
    <li v-for="message in messages" :key="message.id" class="message-item">
      <div class="message-details">
        <strong>
          {{ tab === "received" ? "From:" : "To:" }}
          {{ tab === "received" ? message.sender_username : message.receiver_username }}
        </strong>
        <p>{{ message.content }}</p>
      </div>
      <button class="delete-button" @click="$emit('delete', message.id)">Delete</button>
    </li>
  </ul>
  <p v-else class="no-messages">No messages to display.</p>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
    tab: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Message List Styling */
.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.message-item:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  background-color: #f3f3f3;
}

.message-details {
  flex: 1;
  margin-right: 15px;
}

.message-details strong {
  display: block;
  font-size: 1rem;
  color: #333;
}

.message-details p {
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #555;
}

/* Delete Button */
.delete-button {
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #d32f2f;
}

/* No Messages Text */
.no-messages {
  text-align: center;
  font-size: 1rem;
  color: #888;
  margin-top: 20px;
}
</style>
