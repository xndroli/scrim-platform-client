// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/auth';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  isTokenValid: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      setAuth: (token, user) => {
        set({ token, user, isAuthenticated: true });
      },
      
      clearAuth: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
      
      isTokenValid: () => {
        const { token } = get();
        
        if (!token) return false;
        
        try {
          const decoded = jwtDecode(token);
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