// src/lib/cookieStorage.ts
import Cookies from 'js-cookie';
import type { StateStorage } from 'zustand/middleware';

const AUTH_TOKEN_COOKIE = 'auth-token';
const COOKIE_EXPIRY_DAYS = 7;

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
        Cookies.set(AUTH_TOKEN_COOKIE, parsed.token, { 
          expires: COOKIE_EXPIRY_DAYS, 
          path: '/',
          sameSite: 'strict',
          secure: window.location.protocol === 'https:' // Only use secure in HTTPS
        });
      } else {
        Cookies.remove(AUTH_TOKEN_COOKIE, { path: '/' });
      }
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  },
  
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    Cookies.remove(AUTH_TOKEN_COOKIE, { path: '/' });
  }
};