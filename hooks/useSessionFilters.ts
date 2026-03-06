import { useEffect, useState } from 'react';

import { getDefaultFilters } from '@/lib/releases';
import { sessionStorageAdapter } from '@/lib/sessionStorage';
import type { ReleaseFilters } from '@/lib/types';

const storageKey = 'release-radar:filters';

export function useSessionFilters() {
  const [filters, setFilters] = useState<ReleaseFilters>(getDefaultFilters());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    sessionStorageAdapter
      .getItem(storageKey)
      .then((value) => {
        if (!active || !value) {
          return;
        }

        const parsed = JSON.parse(value) as ReleaseFilters;
        setFilters({
          genres: parsed.genres ?? [],
          platforms: parsed.platforms ?? [],
          types: parsed.types ?? [],
          windows: parsed.windows ?? [],
        });
      })
      .finally(() => {
        if (active) {
          setLoaded(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    sessionStorageAdapter.setItem(storageKey, JSON.stringify(filters));
  }, [filters, loaded]);

  function toggleFilter(key: keyof ReleaseFilters, value: string) {
    setFilters((current) => {
      const exists = current[key].includes(value);

      return {
        ...current,
        [key]: exists ? current[key].filter((item) => item !== value) : [...current[key], value],
      };
    });
  }

  async function clearFilters() {
    const defaults = getDefaultFilters();
    setFilters(defaults);
    await sessionStorageAdapter.removeItem(storageKey);
  }

  return {
    clearFilters,
    filters,
    loaded,
    toggleFilter,
  };
}
