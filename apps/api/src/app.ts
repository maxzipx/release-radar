import { Hono } from "hono";
import { cors } from "hono/cors";
import { healthRoutes } from "./routes/health.js";
import { v1Routes } from "./routes/v1/index.js";
import { env } from "./lib/env.js";

export const app = new Hono();

app.use(
  "*",
  cors({
    origin: env.corsOrigin,
  }),
);

app.route("/", healthRoutes);
app.route("/api/v1", v1Routes);
