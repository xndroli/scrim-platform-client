// components/auth/auth-provider.tsx - Better-auth provider
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: typeof authClient.signIn;
  signUp: typeof authClient.signUp;
  signOut: typeof authClient.signOut;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        if ('error' in session) {
          console.error("Auth check failed:", session.error);
          setUser(null);
        } else {
          setUser(session?.user || null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: authClient.signIn,
        signUp: authClient.signUp,
        signOut: authClient.signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}