// hooks/useAuth.ts - Simplified hook using Better-auth
import { useSession } from "../lib/auth-client"

export function useAuth() {
  const { data: session, isPending, error } = useSession()
  
  return {
    user: session?.user || null,
    session: session?.session || null,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    isAdmin: session?.user?.role === 'admin',
    isEmailVerified: session?.user?.emailVerified || false,
    hasTwoFactor: session?.user?.twoFactorEnabled || false,
    error
  }
}