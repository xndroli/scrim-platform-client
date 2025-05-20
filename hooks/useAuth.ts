// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import api from '../lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { token, user, isAuthenticated, setAuth, clearAuth, isTokenValid } = useAuthStore();

   // Fetch current user profile
  const { data: profile, refetch: refetchProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/me'); // Use /auth/me endpoint
        return response.data.data.user;
      } catch (error: any) {
        // If unauthorized error, clear auth
        if (error?.response?.status === 401) {
          clearAuth();
          router.push('/login');
        }
        // Rethrow to let React Query handle it
        throw error;
      }
    },
    enabled: isAuthenticated && isTokenValid(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 1
  });

  // Auto-load profile when authenticated but no user data
  useEffect(() => {
    if (isAuthenticated && !user && !profile && !isProfileLoading) {
      refetchProfile();
    }
  }, [isAuthenticated, user, profile, isProfileLoading, refetchProfile]);
  
  // Get user profile function
  const getUserProfile = async (force = false) => {
    if (force || (!user && !profile && isAuthenticated)) {
      try {
        await refetchProfile();
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
      
    }
    return profile || user;
  };
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.data.token, data.data.user);
      toast.success('Logged in successfully');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
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
      setAuth(data.data.token, data.data.user);
      toast.success('Registered successfully');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.push('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });

  // Token refresh mutation
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/auth/refresh-token');
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.data.token, data.data.user || user);
    },
    onError: () => {
      // If refresh fails, log the user out
      clearAuth();
      router.push('/login');
      toast.error('Your session has expired. Please log in again.');
    }
  });
  
  // Refresh token function
  const refreshToken = async () => {
    await refreshTokenMutation.mutateAsync();
  };
  
  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear local auth state regardless of server response
      clearAuth();
      // Clear any cached queries
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/login');
    }
  };

  // Use React Query's loading states directly
  const isLoading = loginMutation.isPending || registerMutation.isPending || isProfileLoading;
  
  // Expose error state from mutations
  const error = loginMutation.error || registerMutation.error;
  const errorMessage = error instanceof Error 
    ? error.message 
    : (error as any)?.response?.data?.message || null;
  
  // Auto refresh token when nearing expiration
  useEffect(() => {
    if (isAuthenticated && token && isTokenValid()) {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const expiryTime = decoded.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        const timeToExpiry = expiryTime - currentTime;
        
        // If token expires in less than 10 minutes, refresh it
        if (timeToExpiry > 0 && timeToExpiry < 10 * 60 * 1000) {
          refreshToken();
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
      }
    }
  }, [isAuthenticated, token]);

  return {
    token,
    user: profile || user,
    isAuthenticated: isAuthenticated && isTokenValid(),
    isLoading,
    error: loginMutation.error || registerMutation.error,
    errorMessage,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    refreshToken,
    getUserProfile,
    refetchProfile,
  };
};