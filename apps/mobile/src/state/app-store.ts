import { create } from "zustand";

type HydrationStatus = "idle" | "loading" | "ready" | "error";

interface AppState {
  hydrationStatus: HydrationStatus;
  hydrationError: string | null;
  hasHydrated: boolean;
  setHydrationState: (status: HydrationStatus, error?: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hydrationStatus: "idle",
  hydrationError: null,
  hasHydrated: false,
  setHydrationState: (status, error = null) =>
    set({
      hydrationStatus: status,
      hydrationError: status === "error" ? error ?? "Unknown hydration error." : null,
      hasHydrated: status === "ready",
    }),
}));
