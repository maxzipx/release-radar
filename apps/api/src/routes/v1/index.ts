import { Hono } from "hono";
import { releasesRoutes } from "./releases.js";
import { triviaRoutes } from "./trivia.js";

export const v1Routes = new Hono();

v1Routes.route("/releases", releasesRoutes);
v1Routes.route("/trivia", triviaRoutes);
