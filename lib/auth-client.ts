import { createAuthClient } from "better-auth/client";
// import { twoFactorClient } from "better-auth/client/plugins"
// import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_API_ENDPOINT!
    : "http://localhost:3001",
    credentials: 'include',
    plugins: [
        // twoFactorClient(),
        // adminClient()
    ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
