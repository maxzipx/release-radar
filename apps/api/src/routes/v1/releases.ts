import { Hono } from "hono";
import type { ApiListResponse, ReleaseSummary } from "@release-dates/shared";

export const releasesRoutes = new Hono();

releasesRoutes.get("/", (c) => {
  const payload: ApiListResponse<ReleaseSummary> = {
    data: [],
    meta: {
      isPlaceholder: true,
      message: "Releases will be wired in a later phase.",
    },
  };

  return c.json(payload);
});
