// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types/auth';

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
        // Check if user has admin role
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
          
          return (decoded.exp || 0) > currentTime;
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