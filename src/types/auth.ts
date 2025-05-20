// types/auth.ts
export interface User {
  id: number;
  username: string;
  email: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}