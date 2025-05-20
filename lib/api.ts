// lib/api.ts
import axios from 'axios';
// import { useAuthStore } from '../stores/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Important for cookies
  withCredentials: true,
});

// // Add request interceptor to add token
// api.interceptors.request.use(
//   (config) => {
//     // Get token from store
//     const token = useAuthStore.getState().token;
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Add request interceptor to log headers
api.interceptors.request.use(
  (config) => {
    console.log('Request headers:', config.headers);
    console.log('Request includes credentials:', config.withCredentials);
    return config;
  },
  (error) => Promise.reject(error)
);

// // Add a response interceptor to handle auth errors
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // Handle 401 Unauthorized errors
//     if (error.response?.status === 401) {
//       // Clear token and redirect to login if on client side
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('token');
//         window.location.href = '/login';
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

export default api;