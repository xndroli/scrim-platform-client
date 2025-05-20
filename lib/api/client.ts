// lib/api/client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  cache?: RequestCache;
};

export async function apiClient(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', body, headers = {}, cache } = options;
  
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };
  
  // Get token from localStorage on client side
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth-token');
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }
  
  const config: RequestInit = {
    method,
    headers: requestHeaders,
    cache,
    body: body ? JSON.stringify(body) : undefined,
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}