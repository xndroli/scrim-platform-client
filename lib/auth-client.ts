import { createAuthClient } from "better-auth/client";
import { twoFactorClient } from "better-auth/client/plugins"
import { adminClient } from "better-auth/client/plugins"
import config from "./config";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: config.env.apiEndpoint!,
    plugins: [
        twoFactorClient(),
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
  twoFactor,
  admin
} = authClient