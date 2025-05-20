// hooks/useAuth.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import api from '../lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const { token, user, isAuthenticated, setAuth, clearAuth, isTokenValid } = useAuthStore();
  
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

  // Use React Query's loading states directly
  const isLoading = loginMutation.isPending || registerMutation.isPending;
  
  // Expose error state from mutations
  const error = loginMutation.error || registerMutation.error;
  const errorMessage = error instanceof Error 
    ? error.message 
    : (error as any)?.response?.data?.message || null;
  
  return {
    token,
    user: profile || user,
    isAuthenticated: isAuthenticated && isTokenValid(),
    isLoading,
    error,
    errorMessage,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    refetchProfile,
  };
};