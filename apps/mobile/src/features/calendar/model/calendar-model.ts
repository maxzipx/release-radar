import type { CalendarReleaseItem } from "@release-dates/shared";
import type {
  CalendarRowData,
  CalendarTemporalState,
  DetailSheetData,
} from "@/types/ui-foundation";

const WEEK_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const RELEASE_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const DAY_MS = 24 * 60 * 60 * 1000;

const parseUtcDate = (isoDate: string) => new Date(`${isoDate}T00:00:00.000Z`);

const parseLocalDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
};

const toLocalIsoDate = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isMoreThanDaysPast = (isoDate: string, days: number, now: Date) => {
  const releaseDate = parseLocalDate(isoDate);
  const nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const releaseStart = new Date(
    releaseDate.getFullYear(),
    releaseDate.getMonth(),
    releaseDate.getDate(),
  ).getTime();

  return nowStart - releaseStart > days * DAY_MS;
};

const resolveTemporalState = (release: CalendarReleaseItem, now: Date): CalendarTemporalState => {
  const todayLabel = toLocalIsoDate(now);

  if (release.release_date === todayLabel) {
    return "today";
  }

  if (release.release_state === "archived" || isMoreThanDaysPast(release.release_date, 7, now)) {
    return "archived";
  }

  if (release.date_changed_at) {
    const delta = now.getTime() - new Date(release.date_changed_at).getTime();

    if (delta >= 0 && delta < 7 * DAY_MS) {
      return "dateChanged";
    }
  }

  return "default";
};

const getWeekStartUtc = (isoDate: string) => {
  const releaseDate = parseUtcDate(isoDate);
  const day = releaseDate.getUTCDay();
  const offset = day === 0 ? 6 : day - 1;
  releaseDate.setUTCDate(releaseDate.getUTCDate() - offset);
  releaseDate.setUTCHours(0, 0, 0, 0);
  return releaseDate;
};

const formatReleaseDateLabel = (isoDate: string) => RELEASE_LABEL_FORMATTER.format(parseUtcDate(isoDate));

const formatWeekLabel = (weekStartUtc: Date) => `Week of ${WEEK_LABEL_FORMATTER.format(weekStartUtc)}`;

const normalizeDirector = (release: CalendarReleaseItem) =>
  release.director || release.cast_json[0] || null;

const contentTypeLabel = (contentType: CalendarReleaseItem["content_type"]) =>
  contentType === "series" ? "Series" : "Movie";

const sortReleases = (left: CalendarReleaseItem, right: CalendarReleaseItem) => {
  const dateCompare = left.release_date.localeCompare(right.release_date);
  if (dateCompare !== 0) {
    return dateCompare;
  }

  if (left.editorial_tier !== right.editorial_tier) {
    return left.editorial_tier === "tierA" ? -1 : 1;
  }

  return left.title.localeCompare(right.title);
};

export interface CalendarMappedRow {
  id: string;
  weekKey: string;
  releaseDate: string;
  row: CalendarRowData;
  detail: DetailSheetData;
}

export interface CalendarWeekGroupModel {
  key: string;
  label: string;
  rows: CalendarMappedRow[];
}

export interface CalendarMappedData {
  rowsById: Record<string, CalendarMappedRow>;
  weekGroups: CalendarWeekGroupModel[];
  currentWeekKey: string;
}

export const mapCalendarReleases = (
  releases: CalendarReleaseItem[],
  now = new Date(),
): CalendarMappedData => {
  const rowsById: Record<string, CalendarMappedRow> = {};
  const grouped: Record<string, CalendarWeekGroupModel> = {};
  const currentWeekKey = getWeekStartUtc(toLocalIsoDate(now)).toISOString().slice(0, 10);

  [...releases]
    .sort(sortReleases)
    .forEach((release) => {
      const weekStart = getWeekStartUtc(release.release_date);
      const weekKey = weekStart.toISOString().slice(0, 10);
      const director = normalizeDirector(release);
      const temporalState = resolveTemporalState(release, now);
      const metadataFields = [director, contentTypeLabel(release.content_type)].filter(
        (value): value is string => Boolean(value),
      );

      const mappedRow: CalendarMappedRow = {
        id: release.id,
        weekKey,
        releaseDate: release.release_date,
        row: {
          id: release.id,
          title: release.title,
          releaseDateLabel: formatReleaseDateLabel(release.release_date),
          metadataFields,
          platformLabel: release.platform_label,
          posterUrl: release.poster_url,
          posterBlurhash: release.poster_blurhash,
          editorialTier: release.editorial_tier,
          temporalState,
        },
        detail: {
          id: release.id,
          title: release.title,
          releaseDateLabel: formatReleaseDateLabel(release.release_date),
          metadataFields,
          platformLabel: release.platform_label,
          posterUrl: release.poster_url,
          posterBlurhash: release.poster_blurhash,
          synopsis: release.synopsis,
          cast: release.cast_json,
          trailerUrl: release.trailer_url,
        },
      };

      rowsById[release.id] = mappedRow;

      if (!grouped[weekKey]) {
        grouped[weekKey] = {
          key: weekKey,
          label: formatWeekLabel(weekStart),
          rows: [],
        };
      }

      grouped[weekKey].rows.push(mappedRow);
    });

  const weekGroups = Object.values(grouped).sort((left, right) => left.key.localeCompare(right.key));

  return {
    rowsById,
    weekGroups,
    currentWeekKey,
  };
};

export const getInitialCalendarWindow = (now = new Date()) => {
  const todayIso = toLocalIsoDate(now);
  const currentWeekStart = getWeekStartUtc(todayIso);
  const initialStart = new Date(currentWeekStart);
  const initialEnd = new Date(currentWeekStart);

  initialStart.setUTCDate(initialStart.getUTCDate() - 7);
  initialEnd.setUTCDate(initialEnd.getUTCDate() + (8 * 7 + 6));

  return {
    from: initialStart.toISOString().slice(0, 10),
    to: initialEnd.toISOString().slice(0, 10),
    currentWeekKey: currentWeekStart.toISOString().slice(0, 10),
  };
};

export const extendWindowForward = (to: string) => {
  const end = parseUtcDate(to);
  const nextFrom = new Date(end);
  const nextTo = new Date(end);

  nextFrom.setUTCDate(nextFrom.getUTCDate() + 1);
  nextTo.setUTCDate(nextTo.getUTCDate() + 28);

  return {
    from: nextFrom.toISOString().slice(0, 10),
    to: nextTo.toISOString().slice(0, 10),
  };
};

export const extendWindowBackward = (from: string) => {
  const start = parseUtcDate(from);
  const nextFrom = new Date(start);
  const nextTo = new Date(start);

  nextFrom.setUTCDate(nextFrom.getUTCDate() - 28);
  nextTo.setUTCDate(nextTo.getUTCDate() - 1);

  return {
    from: nextFrom.toISOString().slice(0, 10),
    to: nextTo.toISOString().slice(0, 10),
  };
};
