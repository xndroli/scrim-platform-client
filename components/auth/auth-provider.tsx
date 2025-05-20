'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  register: (credentials: { username: string; email: string; password: string }) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  
  // Check if user is authenticated on mount and route changes
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setUser(null);
          setIsLoading(false);
          
          // Redirect to login if accessing protected routes
          if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
            router.push('/login');
          }
          
          return;
        }
        
        // Check if token is expired
        try {
          const decoded = jwtDecode(token) as { exp?: number };
          const currentTime = Date.now() / 1000;
          
          if ((decoded.exp || 0) <= currentTime) {
            localStorage.removeItem('token');
            setUser(null);
            
            if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
              router.push('/login');
            }
            
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error('Token decode error:', err);
          localStorage.removeItem('token');
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Fetch user data
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUser(data.data.user);
        
        // Redirect to dashboard if on login/register page
        if (pathname === '/login' || pathname === '/register') {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('token');
        setUser(null);
        
        if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [pathname, router]);
  
  // Login function
  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      const token = data.token || data.data?.token;
      localStorage.setItem('token', token);
      
      const userData = data.user || data.data?.user;
      setUser(userData);
      
      return userData;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register function
  const register = async (credentials: { username: string; email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      const token = data.token || data.data?.token;
      localStorage.setItem('token', token);
      
      const userData = data.user || data.data?.user;
      setUser(userData);
      
      return userData;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };
  
  const isAuthenticated = !!user;
  
  const contextValue = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}