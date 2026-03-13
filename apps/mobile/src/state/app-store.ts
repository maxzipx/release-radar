import { create } from "zustand";

interface AppState {
  hasHydrated: boolean;
  setHydrated: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasHydrated: false,
  setHydrated: (value) => set({ hasHydrated: value }),
}));
