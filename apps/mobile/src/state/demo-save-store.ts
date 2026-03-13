import { create } from "zustand";

interface DemoSaveState {
  savedById: Record<string, true>;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  seedSaved: (ids: string[]) => void;
}

export const useDemoSaveStore = create<DemoSaveState>((set, get) => ({
  savedById: { "rd-harbor": true },
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
  seedSaved: (ids) =>
    set({
      savedById: ids.reduce<Record<string, true>>((acc, id) => {
        acc[id] = true;
        return acc;
      }, {}),
    }),
}));
