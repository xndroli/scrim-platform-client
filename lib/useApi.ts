// lib/useApi.ts
import { useAuth } from '@clerk/nextjs';

export function useApi() {
  const { getToken } = useAuth();
  
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return await response.json();
  };
  
  return { apiCall };
}