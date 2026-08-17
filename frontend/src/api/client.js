import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://freelancing-t8mv.onrender.com',
});

export default apiClient;
