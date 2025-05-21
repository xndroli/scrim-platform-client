// src/lib/cookieStorage.ts
import Cookies from 'js-cookie';
import type { StateStorage } from 'zustand/middleware';

const AUTH_TOKEN_COOKIE = 'auth-token';
const COOKIE_EXPIRY_DAYS = 7;

// Cookie configuration for cross-domain use
const COOKIE_OPTIONS = {
  expires: COOKIE_EXPIRY_DAYS,
  path: '/',
  sameSite: 'none' as const,
  secure: true, // Required when sameSite is 'none'
};

export const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    const token = Cookies.get(AUTH_TOKEN_COOKIE);
    if (!token) return null;
    
    // Return only the token
    return JSON.stringify({ token });
  },
  
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      const parsed = JSON.parse(value);
      
      if (parsed.token) {
        // Set the cookie with the exact name the server expects
        Cookies.set(AUTH_TOKEN_COOKIE, parsed.token, COOKIE_OPTIONS); 
        console.log(`Cookie '${AUTH_TOKEN_COOKIE}' set successfully:`, parsed.token.substring(0, 10) + '...');
      } else {
        Cookies.remove(AUTH_TOKEN_COOKIE, COOKIE_OPTIONS);
        console.log(`Cookie '${AUTH_TOKEN_COOKIE}' removed due to null token`);
      }
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  },
  
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    Cookies.remove(AUTH_TOKEN_COOKIE, COOKIE_OPTIONS);
    console.log(`Cookie '${AUTH_TOKEN_COOKIE}' removed`);
  }
};