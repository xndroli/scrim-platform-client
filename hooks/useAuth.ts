// hooks/useAuth.ts
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import api from '../lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const { token, user, isAuthenticated, setAuth, clearAuth, isTokenValid } = useAuthStore();
  const [loading, setLoading] = useState(false);
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success('Logged in successfully');
      router.push('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async ({ username, email, password }: { username: string; email: string; password: string }) => {
      const response = await api.post('/auth/register', { username, email, password });
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success('Registered successfully');
      router.push('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
  
  // Fetch current user profile
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/users/profile');
      return response.data.data.user;
    },
    enabled: isAuthenticated && isTokenValid(),
  });
  
  // Logout function
  const logout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    router.push('/login');
  };
  
  return {
    token,
    user: profile || user,
    isAuthenticated: isAuthenticated && isTokenValid(),
    loading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    refetchProfile,
  };
};