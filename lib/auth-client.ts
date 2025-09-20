import { createAuthClient } from "better-auth/react";
import { stripeClient } from "@better-auth/stripe/client";
import { useAuthToken } from "@/hooks/use-auth-token";

export const authClient = createAuthClient({
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => useAuthToken.getState().bearerToken || "",
    },
  },
  plugins: [
    stripeClient({
      subscription: true,
    }),
  ],
});
