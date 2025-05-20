import type { User } from '../types/auth';

// Get user from localStorage
export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem('auth-user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing stored user:', error);
    return null;
  }
};

// Store user and token in localStorage
export const setStoredUser = (user: User, token: string): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('auth-token', token);
  localStorage.setItem('auth-user', JSON.stringify(user));
};

// Remove user and token from localStorage
export const removeStoredUser = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('auth-token');
  localStorage.removeItem('auth-user');
};

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('auth-token');
};
