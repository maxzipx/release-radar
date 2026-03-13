import { Hono } from "hono";
import type { ApiHealthResponse } from "@release-dates/shared";

export const healthRoutes = new Hono();

healthRoutes.get("/health", (c) => {
  const payload: ApiHealthResponse = {
    status: "ok",
    service: "release-dates-api",
    version: "phase-0",
    timestamp: new Date().toISOString(),
  };

  return c.json(payload);
});
