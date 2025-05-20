// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import type { User } from '@/types/auth';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  isTokenValid: () => boolean;
}

interface JwtPayload {
  userId: number;
  username: string;
  role?: string;
  exp?: number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      
      setAuth: (token, user) => {
        // Check if user has admin role from the token
        let isAdmin = false;
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          isAdmin = decoded.role === 'admin';
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
        
        set({ token, user, isAuthenticated: true, isAdmin });
      },
      
      clearAuth: () => {
        set({ token: null, user: null, isAuthenticated: false, isAdmin: false });
      },
      
      isTokenValid: () => {
        const { token } = get();
        
        if (!token) return false;
        
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          const currentTime = Date.now() / 1000;
          
          // Check if token is expired
          if (!decoded.exp || decoded.exp <= currentTime) {
            // If token is expired, clear auth state
            get().clearAuth();
            return false;
          }
          
          // Check if token will expire in the next 5 minutes
          // This helps avoid situations where token expires during user session
          const expiresInFiveMinutes = decoded.exp - currentTime < 300; // 5 minutes in seconds
          if (expiresInFiveMinutes) {
            console.warn('Token will expire soon, consider refreshing');
            // You could trigger a token refresh here if your API supports it
          }
          
          return true;
        } catch (error) {
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);