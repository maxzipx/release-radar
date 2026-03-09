import React, { createContext, useContext, useEffect, useState } from 'react';

import { getWatchlist, setWatchlist } from '@/lib/storage';

type WatchlistContextType = {
  savedIds: string[];
  toggleSaved: (id: string) => Promise<void>;
  isSaved: (id: string) => boolean;
  clearWatchlist: () => Promise<void>;
};

const WatchlistContext = createContext<WatchlistContextType | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    let active = true;

    async function init() {
      const ids = await getWatchlist();

      if (active) {
        setSavedIds(ids);
      }
    }

    init();

    return () => {
      active = false;
    };
  }, []);

  const toggleSaved = async (id: string) => {
    let nextIds: string[] = [];

    setSavedIds((current) => {
      nextIds = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      return nextIds;
    });

    await setWatchlist(nextIds);
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const clearWatchlist = async () => {
    setSavedIds([]);
    await setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider value={{ savedIds, toggleSaved, isSaved, clearWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }

  return context;
}
