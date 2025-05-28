import { createAuthClient } from "better-auth/client";
// import { twoFactorClient } from "better-auth/client/plugins"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // Use the full API URL for Better-auth endpoints
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001',
    fetchOptions: {
      credentials: 'include',
    },
    plugins: [
        // twoFactorClient(),
        adminClient()
    ]
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  // user,
  // session,
  // twoFactor,
  admin
} = authClient;

