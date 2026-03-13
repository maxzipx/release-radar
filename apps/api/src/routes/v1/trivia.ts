import { Hono } from "hono";
import type { ApiItemResponse, TriviaQuestionSummary } from "@release-dates/shared";

export const triviaRoutes = new Hono();

triviaRoutes.get("/today", (c) => {
  const payload: ApiItemResponse<TriviaQuestionSummary> = {
    data: null,
    meta: {
      isPlaceholder: true,
      message: "Trivia will be wired in a later phase.",
    },
  };

  return c.json(payload);
});
