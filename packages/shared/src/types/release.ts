export interface ReleaseSummary {
  id: string;
  title: string;
  contentType: "movie" | "series" | "special";
  platformLabel: string;
  releaseDate: string;
  editorialTier: "standard" | "spotlight";
}
