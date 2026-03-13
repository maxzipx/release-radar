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

export interface ApiListResponse<T, TMeta = PlaceholderMeta> {
  data: T[];
  meta: TMeta;
}

export interface ApiItemResponse<T, TMeta = PlaceholderMeta> {
  data: T | null;
  meta: TMeta;
}
