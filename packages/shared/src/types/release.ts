export interface ReleaseSummary {
  id: string;
  title: string;
  contentType: "movie" | "series";
  platformLabel: string;
  releaseDate: string;
  editorialTier: "standard" | "tierA";
}

export type ReleaseContentType = "movie" | "series";
export type ReleaseEditorialTier = "standard" | "tierA";
export type ReleaseState = "upcoming" | "archived";

export interface CalendarReleaseItem {
  id: string;
  title: string;
  content_type: ReleaseContentType;
  director: string | null;
  poster_url: string | null;
  poster_blurhash: string | null;
  trailer_url: string | null;
  release_date: string;
  platform_label: string;
  editorial_tier: ReleaseEditorialTier;
  release_state: ReleaseState;
  date_changed_at: string | null;
  synopsis: string;
  cast_json: string[];
}

export interface CalendarReleasesMeta {
  isPlaceholder: boolean;
  from: string;
  to: string;
  count: number;
}
