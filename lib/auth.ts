import type { User } from '../types/auth';
import Cookies from 'js-cookie';

// Cookie configuration
const AUTH_TOKEN_COOKIE = 'auth-token';
const USER_COOKIE = 'auth-user';
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  sameSite: 'none' as const,
  secure: true, // Required when sameSite is 'none'
};

// Get user from cookie
export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = Cookies.get(USER_COOKIE);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing stored user:', error);
    return null;
  }
};

// Store user and token in cookies
export const setStoredUser = (user: User, token: string): void => {
  if (typeof window === 'undefined') return;
  
  Cookies.set(AUTH_TOKEN_COOKIE, token, COOKIE_OPTIONS);
  Cookies.set(USER_COOKIE, JSON.stringify(user), COOKIE_OPTIONS);
  
  console.log(`Auth token cookie set: ${AUTH_TOKEN_COOKIE}`);
  console.log(`User data cookie set: ${USER_COOKIE}`);
};

// Remove user and token from cookies
export const removeStoredUser = (): void => {
  if (typeof window === 'undefined') return;
  
  // Must use the same options when removing cross-domain cookies
  Cookies.remove(AUTH_TOKEN_COOKIE, COOKIE_OPTIONS);
  Cookies.remove(USER_COOKIE, COOKIE_OPTIONS);
  
  console.log(`Auth token cookie removed: ${AUTH_TOKEN_COOKIE}`);
  console.log(`User data cookie removed: ${USER_COOKIE}`);
};

// Get auth token from cookie
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return Cookies.get(AUTH_TOKEN_COOKIE) || null;
};