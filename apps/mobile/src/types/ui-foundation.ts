export type EditorialTier = "standard" | "tierA";

export type CalendarTemporalState =
  | "default"
  | "today"
  | "archived"
  | "dateChanged";

export type PosterStateOverride =
  | "auto"
  | "loading"
  | "loaded"
  | "nullFallback"
  | "errorFallback";

export type TriviaOptionState = "default" | "correct" | "incorrect" | "dimmed";

export interface CalendarRowData {
  id: string;
  title: string;
  releaseDateLabel: string;
  metadataFields: string[];
  platformLabel: string;
  posterUrl?: string | null;
  posterBlurhash?: string | null;
  editorialTier: EditorialTier;
  temporalState: CalendarTemporalState;
}

export interface DetailSheetData {
  id: string;
  title: string;
  releaseDateLabel: string;
  metadataFields: string[];
  platformLabel: string;
  posterUrl?: string | null;
  posterBlurhash?: string | null;
  synopsis: string;
  cast: string[];
  trailerUrl?: string | null;
}
