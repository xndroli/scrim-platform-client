// lib/clerk.ts
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import api from "./api";

// Hook to sync Clerk token with our API
export function useClerkToken() {
  const { getToken } = useAuth();
  
  useEffect(() => {
    const syncToken = async () => {
      const token = await getToken();
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };
    
    syncToken();
  }, [getToken]);
}