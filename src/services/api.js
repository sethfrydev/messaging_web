import axios from 'axios';
import { authState } from '../store/auth'; // Import authState for global state management

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header dynamically based on authState
apiClient.interceptors.request.use((config) => {
  const token = authState.user?.authToken || localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
