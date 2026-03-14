import type { CalendarReleaseItem } from "@release-dates/shared";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { env } from "@/config/env";
import { apiClient } from "@/services/api/client";
import { buildMockCalendarReleases } from "@/features/calendar/data/mockReleases";
import {
  extendWindowBackward,
  extendWindowForward,
  getInitialCalendarWindow,
  mapCalendarReleases,
} from "@/features/calendar/model/calendar-model";

type CalendarLoadStatus = "loading" | "ready" | "error";

interface WindowRange {
  from: string;
  to: string;
}

const rangeKey = (range: WindowRange) => `${range.from}:${range.to}`;

const filterRange = (items: CalendarReleaseItem[], range: WindowRange) =>
  items.filter(
    (item) => item.release_date >= range.from && item.release_date <= range.to,
  );

const mergeById = (
  previous: Record<string, CalendarReleaseItem>,
  items: CalendarReleaseItem[],
) => {
  const next = { ...previous };

  for (const item of items) {
    next[item.id] = item;
  }

  return next;
};

export const useCalendarFeed = () => {
  const initialWindow = useMemo(() => getInitialCalendarWindow(), []);
  const [, setWindowRange] = useState<WindowRange>({
    from: initialWindow.from,
    to: initialWindow.to,
  });
  const [status, setStatus] = useState<CalendarLoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [releaseMap, setReleaseMap] = useState<Record<string, CalendarReleaseItem>>({});

  const loadedRangesRef = useRef(new Set<string>());
  const inFlightRangesRef = useRef(new Set<string>());
  const requestGenerationRef = useRef(0);
  const sourceModeRef = useRef<"api" | "mock" | null>(null);
  const mockReleasesRef = useRef(buildMockCalendarReleases());

  const fetchRange = useCallback(
    async (range: WindowRange, options?: { force?: boolean; generation?: number }) => {
      const key = rangeKey(range);
      const force = options?.force ?? false;
      const generation = options?.generation ?? requestGenerationRef.current;
      const inFlightKey = `${generation}:${key}`;

      if (generation !== requestGenerationRef.current) {
        return;
      }

      if (!force && loadedRangesRef.current.has(key)) {
        return;
      }

      if (inFlightRangesRef.current.has(inFlightKey)) {
        return;
      }

      inFlightRangesRef.current.add(inFlightKey);

      try {
        let releases: CalendarReleaseItem[] = [];
        let source = sourceModeRef.current;

        const shouldUseMock = source === "mock" || !env.apiUrl;

        if (shouldUseMock) {
          releases = filterRange(mockReleasesRef.current, range);
          source = "mock";
        } else {
          const response = await apiClient.getReleases(range);

          if (response.meta.isPlaceholder) {
            releases = filterRange(mockReleasesRef.current, range);
            source = "mock";
          } else {
            releases = response.data;
            source = "api";
          }
        }

        if (generation !== requestGenerationRef.current) {
          return;
        }

        sourceModeRef.current = source;
        loadedRangesRef.current.add(key);
        setReleaseMap((previous) => mergeById(previous, releases));
        setStatus("ready");
        setErrorMessage(null);
      } catch (error) {
        if (generation !== requestGenerationRef.current) {
          return;
        }

        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load releases.",
        );
      } finally {
        inFlightRangesRef.current.delete(inFlightKey);
      }
    },
    [],
  );

  useEffect(() => {
    void fetchRange(
      {
        from: initialWindow.from,
        to: initialWindow.to,
      },
      { force: true },
    );
  }, [fetchRange, initialWindow.from, initialWindow.to]);

  const loadForward = useCallback(() => {
    setWindowRange((previous) => {
      const nextRange = extendWindowForward(previous.to);
      void fetchRange(nextRange);
      return {
        from: previous.from,
        to: nextRange.to,
      };
    });
  }, [fetchRange]);

  const loadBackward = useCallback(() => {
    setWindowRange((previous) => {
      const nextRange = extendWindowBackward(previous.from);
      void fetchRange(nextRange);
      return {
        from: nextRange.from,
        to: previous.to,
      };
    });
  }, [fetchRange]);

  const refresh = useCallback(async () => {
    requestGenerationRef.current += 1;
    const generation = requestGenerationRef.current;
    const nextWindow = {
      from: initialWindow.from,
      to: initialWindow.to,
    };

    setIsRefreshing(true);
    setStatus("loading");
    setErrorMessage(null);
    setWindowRange(nextWindow);
    sourceModeRef.current = null;
    loadedRangesRef.current.clear();
    inFlightRangesRef.current.clear();
    setReleaseMap({});

    await fetchRange(nextWindow, { force: true, generation });
    setIsRefreshing(false);
  }, [fetchRange, initialWindow.from, initialWindow.to]);

  const mappedData = useMemo(
    () => mapCalendarReleases(Object.values(releaseMap)),
    [releaseMap],
  );

  return {
    currentWeekKey: mappedData.currentWeekKey,
    detailById: Object.fromEntries(
      Object.values(mappedData.rowsById).map((value) => [value.id, value.detail]),
    ),
    rowById: mappedData.rowsById,
    status,
    errorMessage,
    isRefreshing,
    listItems: mappedData.listItems,
    weekGroups: mappedData.weekGroups,
    loadForward,
    loadBackward,
    refresh,
  } as const;
};
