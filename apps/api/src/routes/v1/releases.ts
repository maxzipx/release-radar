import { Hono } from "hono";
import type {
  ApiListResponse,
  CalendarReleaseItem,
  CalendarReleasesMeta,
  ReleaseContentType,
  ReleaseEditorialTier,
  ReleaseState,
} from "@release-dates/shared";
import { getSupabaseServerClient } from "../../lib/supabase.js";

export const releasesRoutes = new Hono();

interface ReleaseRow {
  id: string;
  title: string | null;
  content_type: string | null;
  director: string | null;
  cast_json: unknown;
  synopsis: string | null;
  poster_url: string | null;
  trailer_url: string | null;
  release_date: string | null;
  platform_label: string | null;
  editorial_tier: string | null;
  release_state: string | null;
  date_changed_at: string | null;
}

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isIsoDate = (value: string) => ISO_DATE_PATTERN.test(value);

const normalizeContentType = (value: string | null): ReleaseContentType | null => {
  if (value === "movie" || value === "series") {
    return value;
  }

  return null;
};

const normalizeEditorialTier = (value: string | null): ReleaseEditorialTier =>
  value === "tierA" ? "tierA" : "standard";

const normalizeReleaseState = (value: string | null): ReleaseState =>
  value === "archived" ? "archived" : "upcoming";

const normalizeCast = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
};

releasesRoutes.get("/", async (c) => {
  const from = c.req.query("from") ?? "";
  const to = c.req.query("to") ?? "";

  if (!isIsoDate(from) || !isIsoDate(to)) {
    return c.json(
      {
        error: "Query params 'from' and 'to' are required in YYYY-MM-DD format.",
      },
      400,
    );
  }

  if (from > to) {
    return c.json(
      {
        error: "Query param 'from' must be less than or equal to 'to'.",
      },
      400,
    );
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("titles")
    .select(
      [
        "id",
        "title",
        "content_type",
        "director",
        "cast_json",
        "synopsis",
        "poster_url",
        "trailer_url",
        "release_date",
        "platform_label",
        "editorial_tier",
        "release_state",
        "date_changed_at",
      ].join(","),
    )
    .eq("is_visible", true)
    .gte("release_date", from)
    .lte("release_date", to)
    .in("content_type", ["movie", "series"])
    .order("release_date", { ascending: true })
    .order("editorial_tier", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    return c.json(
      {
        error: "Failed to load releases.",
        message: error.message,
      },
      500,
    );
  }

  const rows = (data ?? []) as unknown as ReleaseRow[];
  const mapped = rows.reduce<CalendarReleaseItem[]>((acc, row) => {
    const contentType = normalizeContentType(row.content_type);

    if (!row.id || !row.release_date || !contentType) {
      return acc;
    }

    acc.push({
      id: row.id,
      title: row.title ?? "",
      content_type: contentType,
      director: row.director,
      poster_url: row.poster_url,
      poster_blurhash: null,
      trailer_url: row.trailer_url,
      release_date: row.release_date,
      platform_label: row.platform_label ?? "",
      editorial_tier: normalizeEditorialTier(row.editorial_tier),
      release_state: normalizeReleaseState(row.release_state),
      date_changed_at: row.date_changed_at,
      synopsis: row.synopsis ?? "",
      cast_json: normalizeCast(row.cast_json),
    });

    return acc;
  }, []);

  const payload: ApiListResponse<CalendarReleaseItem, CalendarReleasesMeta> = {
    data: mapped,
    meta: {
      isPlaceholder: false,
      from,
      to,
      count: mapped.length,
    },
  };

  return c.json(payload);
});
