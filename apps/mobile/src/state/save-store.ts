import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SaveState {
  savedById: Record<string, true>;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSaveStore = create<SaveState>()(
  persist(
    (set, get) => ({
      savedById: {},
      toggleSaved: (id) =>
        set((state) => {
          if (state.savedById[id]) {
            const next = { ...state.savedById };
            delete next[id];
            return { savedById: next };
          }

          return {
            savedById: {
              ...state.savedById,
              [id]: true,
            },
          };
        }),
      isSaved: (id) => Boolean(get().savedById[id]),
    }),
    {
      name: "release-dates-saved-titles-v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        savedById: state.savedById,
      }),
    },
  ),
);
