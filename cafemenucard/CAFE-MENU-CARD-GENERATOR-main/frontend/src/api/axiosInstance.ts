import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5001/api`;

// Autocorrect if user forgot /api in their VITE_API_URL
if (import.meta.env.VITE_API_URL && !baseURL.includes('/api')) {
  baseURL = baseURL.endsWith('/') ? baseURL + 'api' : baseURL + '/api';
}

if (!baseURL.endsWith('/')) {
  baseURL += '/';
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
