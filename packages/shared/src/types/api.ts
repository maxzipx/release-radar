export interface PlaceholderMeta {
  isPlaceholder: boolean;
  message: string;
}

export interface ApiHealthResponse {
  status: "ok";
  service: string;
  version: string;
  timestamp: string;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: PlaceholderMeta;
}

export interface ApiItemResponse<T> {
  data: T | null;
  meta: PlaceholderMeta;
}
