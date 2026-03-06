import { formatMonthDay, formatMonthLabel, getQuarterRank, parseDateOnly, toDateKey } from '@/lib/date';
import type { Release, ReleaseFilters, TimelineSection } from '@/lib/types';

const EMPTY_FILTERS: ReleaseFilters = {
  genres: [],
  platforms: [],
  types: [],
  windows: [],
};

function getWindowLabel(release: Release) {
  return release.releaseStatus === 'confirmed' && release.releaseDate
    ? formatMonthLabel(release.releaseDate)
    : release.releaseQuarter;
}

function matchesAnyFilter(activeValues: string[], candidateValues: string[]) {
  return activeValues.length === 0 || candidateValues.some((candidate) => activeValues.includes(candidate));
}

export function getDefaultFilters() {
  return {
    genres: [...EMPTY_FILTERS.genres],
    platforms: [...EMPTY_FILTERS.platforms],
    types: [...EMPTY_FILTERS.types],
    windows: [...EMPTY_FILTERS.windows],
  };
}

export function sortReleases(releases: Release[]) {
  return [...releases].sort((left, right) => {
    const leftDate = left.releaseDate ? parseDateOnly(left.releaseDate) : null;
    const rightDate = right.releaseDate ? parseDateOnly(right.releaseDate) : null;

    if (leftDate && rightDate) {
      return leftDate.getTime() - rightDate.getTime();
    }

    if (leftDate && !rightDate) {
      return -1;
    }

    if (!leftDate && rightDate) {
      return 1;
    }

    const quarterDifference = getQuarterRank(left.releaseQuarter) - getQuarterRank(right.releaseQuarter);

    if (quarterDifference !== 0) {
      return quarterDifference;
    }

    return right.heatScore - left.heatScore;
  });
}

export function getTimelineSections(releases: Release[]): TimelineSection[] {
  const buckets = new Map<string, Release[]>();

  for (const release of sortReleases(releases)) {
    const label = getWindowLabel(release);

    if (!buckets.has(label)) {
      buckets.set(label, []);
    }

    buckets.get(label)?.push(release);
  }

  return [...buckets.entries()].map(([title, items]) => ({ title, items }));
}

export function getCurrentMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);
}

export function applyReleaseFilters(releases: Release[], filters: ReleaseFilters) {
  return sortReleases(releases).filter((release) => {
    const matchesType = filters.types.length === 0 || filters.types.includes(release.type);
    const matchesPlatform = filters.platforms.length === 0 || filters.platforms.includes(release.platform);
    const matchesGenre = matchesAnyFilter(filters.genres, release.genres);
    const matchesWindow = filters.windows.length === 0 || filters.windows.includes(getWindowLabel(release));

    return matchesType && matchesPlatform && matchesGenre && matchesWindow;
  });
}

export function getFilterOptions(releases: Release[]) {
  const genres = new Set<string>();
  const platforms = new Set<string>();
  const windows = new Set<string>();

  for (const release of releases) {
    release.genres.forEach((genre) => genres.add(genre));
    platforms.add(release.platform);
    windows.add(getWindowLabel(release));
  }

  return {
    genres: [...genres].sort(),
    platforms: [...platforms].sort(),
    types: ['film', 'tv'],
    windows: [...windows].sort((left, right) => {
      const monthOrder = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const leftMonthIndex = monthOrder.indexOf(left);
      const rightMonthIndex = monthOrder.indexOf(right);

      if (leftMonthIndex >= 0 && rightMonthIndex >= 0) {
        return leftMonthIndex - rightMonthIndex;
      }

      if (leftMonthIndex >= 0) {
        return -1;
      }

      if (rightMonthIndex >= 0) {
        return 1;
      }

      return left.localeCompare(right);
    }),
  };
}

export function getThisWeekReleases(releases: Release[], from: Date) {
  const todayKey = toDateKey(from);
  const end = new Date(from);
  end.setDate(end.getDate() + 7);
  const endKey = toDateKey(end);

  return sortReleases(releases).filter((release) => {
    if (release.releaseStatus !== 'confirmed' || !release.releaseDate) {
      return false;
    }

    const releaseDate = parseDateOnly(release.releaseDate);

    if (!releaseDate) {
      return false;
    }

    const releaseKey = toDateKey(releaseDate);
    return releaseKey >= todayKey && releaseKey <= endKey;
  });
}

export function formatReleaseDateLabel(release: Release) {
  if (release.releaseStatus === 'confirmed' && release.releaseDate) {
    return formatMonthDay(release.releaseDate);
  }

  return `${release.releaseQuarter} TBA`;
}

export function formatDateRangeLabel(start: Date) {
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return `${formatter.format(start)} to ${formatter.format(end)}`;
}
