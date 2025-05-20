// lib/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Important for cookies
  withCredentials: true,
});

// // Add a request interceptor to include token
// api.interceptors.request.use(
//   (config) => {
//     // Get token from local storage
//     const token = typeof window !== 'undefined' 
//       ? localStorage.getItem('token') 
//       : null;
    
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

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