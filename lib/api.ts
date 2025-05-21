// lib/api.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const AUTH_TOKEN_COOKIE = 'auth-token';

// Cookie options must match across the application
const COOKIE_OPTIONS = {
  path: '/',
  sameSite: 'none' as const,
  secure: true,
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Important for cookies - this ensures cookies are sent with cross-origin requests
  withCredentials: true,
});

// Request interceptor to log headers for debugging
api.interceptors.request.use(
  (config) => {
    // Log request details to help with debugging
    console.log('Request URL:', config.url);
    console.log('Request headers:', config.headers);
    console.log('Request includes credentials:', config.withCredentials);
    
    // Get token from cookie
    const token = Cookies.get(AUTH_TOKEN_COOKIE);
    console.log('Cookie token found:', token ? 'Yes' : 'No');
    
    // Add token to Authorization header as a backup method
    // Some APIs might still check for this even with cookie auth
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added Authorization header');
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      console.log('Authentication error - redirecting to login');
      
      // Clear cookies and redirect to login
      if (typeof window !== 'undefined') {
        // Clear cookies using js-cookie for better cross-browser support
        Cookies.remove(AUTH_TOKEN_COOKIE, COOKIE_OPTIONS);
        Cookies.remove('auth-user', COOKIE_OPTIONS);
        
        // Use router for redirection if possible, or fallback to window.location
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
