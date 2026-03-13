import type {
  ApiItemResponse,
  ApiListResponse,
  ReleaseSummary,
  TriviaQuestionSummary,
} from "@release-dates/shared";
import { env } from "@/config/env";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const request = async <T>(path: string): Promise<T> => {
  if (!env.apiUrl) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(`${trimTrailingSlash(env.apiUrl)}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  return response.json() as Promise<T>;
};

export const apiClient = {
  getReleases: () => request<ApiListResponse<ReleaseSummary>>("/api/v1/releases"),
  getTodayTrivia: () => request<ApiItemResponse<TriviaQuestionSummary>>("/api/v1/trivia/today"),
};
