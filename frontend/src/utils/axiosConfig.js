import axios from 'axios';

// Set axios default base URL for production
if (import.meta.env.PROD) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://freelancing-t8mv.onrender.com';
}

export default axios;
