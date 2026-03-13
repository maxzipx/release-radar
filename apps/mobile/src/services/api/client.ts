import type {
  ApiItemResponse,
  ApiListResponse,
  ReleaseSummary,
  TriviaQuestionSummary,
} from "@release-dates/shared";
import { env } from "@/config/env";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const parseErrorBody = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const payload = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (payload.message) {
        return payload.message;
      }

      if (payload.error) {
        return payload.error;
      }
    } catch {
      return `API request failed with status ${response.status}.`;
    }
  }

  const text = await response.text();

  if (text.trim()) {
    return text.trim();
  }

  return `API request failed with status ${response.status}.`;
};

const request = async <T>(path: string): Promise<T> => {
  if (!env.apiUrl) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(`${trimTrailingSlash(env.apiUrl)}${path}`);

  if (!response.ok) {
    throw new Error(await parseErrorBody(response));
  }

  return response.json() as Promise<T>;
};

export const apiClient = {
  getReleases: () => request<ApiListResponse<ReleaseSummary>>("/api/v1/releases"),
  getTodayTrivia: () => request<ApiItemResponse<TriviaQuestionSummary>>("/api/v1/trivia/today"),
};
