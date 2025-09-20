import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthTokenState {
  bearerToken: string | null;
  setBearerToken: (token: string | null) => void;
  clearBearerToken: () => void;
}

export const useAuthToken = create<AuthTokenState>()(
  persist(
    (set) => ({
      bearerToken: null,
      setBearerToken: (token) => set({ bearerToken: token }),
      clearBearerToken: () => set({ bearerToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
