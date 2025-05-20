// lib/api/auth.ts
import { apiClient } from './client';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  teamId?: number;
};

export const authApi = {
  login: (credentials: LoginCredentials) => 
    apiClient('/auth/login', {
      method: 'POST',
      body: credentials,
    }),
    
  register: (data: RegisterData) => 
    apiClient('/auth/register', {
      method: 'POST',
      body: data,
    }),
    
  resetPassword: (email: string) => 
    apiClient('/auth/reset-password', {
      method: 'POST',
      body: { email },
    }),
};