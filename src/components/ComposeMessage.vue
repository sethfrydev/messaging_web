<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <h2>Compose Message</h2>
      <form @submit.prevent="sendMessage">
        <div class="form-group">
          <label for="recipient-email">Recipient Email</label>
          <input
            id="recipient-email"
            type="text"
            placeholder="Recipient Email"
            v-model="message.receiver_email"
            required
          />
        </div>
        <div class="form-group">
          <label for="message-content">Message Content</label>
          <textarea
            id="message-content"
            placeholder="Message Content"
            v-model="message.content"
            required
          ></textarea>
        </div>
        <div class="modal-buttons">
          <button type="submit" class="btn-send">Send</button>
          <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      message: {
        receiver_email: "",
        content: "",
      },
    };
  },
  methods: {
    sendMessage() {
      this.$emit("send", this.message);
      this.resetForm();
    },
    closeModal() {
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      this.message.receiver_email = "";
      this.message.content = "";
    },
  },
};
</script>

<style scoped>
/* Modal Styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
}

.modal-content h2 {
  margin: 0 0 20px;
  font-size: 1.5rem;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #555;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  height: 120px;
  resize: none;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-send {
  background-color: #4caf50;
  color: white;
  transition: 0.3s;
}

.btn-send:hover {
  background-color: #45a049;
}

.btn-cancel {
  background-color: #ccc;
  color: #333;
  transition: 0.3s;
}

.btn-cancel:hover {
  background-color: #bbb;
}
</style>
