import type { CalendarReleaseItem } from "@release-dates/shared";

const toIsoDate = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addDays = (base: Date, days: number) => {
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return next;
};

const toIsoTimestamp = (value: Date) => value.toISOString();

export const buildMockCalendarReleases = (today = new Date()): CalendarReleaseItem[] => {
  const anchor = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const items: CalendarReleaseItem[] = [
    {
      id: "mock-echoes",
      title: "Echoes of Summer",
      content_type: "movie",
      director: "Ari Cohen",
      poster_url: "https://picsum.photos/seed/calendar-echoes/300/450",
      poster_blurhash: null,
      trailer_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      release_date: toIsoDate(addDays(anchor, 0)),
      platform_label: "Theatrical",
      editorial_tier: "tierA",
      release_state: "upcoming",
      date_changed_at: toIsoTimestamp(addDays(anchor, -2)),
      synopsis:
        "A former documentarian returns home and discovers a decades-long coverup embedded in family archives.",
      cast_json: ["Maya Son", "Leo Hart"],
    },
    {
      id: "mock-harbor",
      title: "Harbor Station",
      content_type: "series",
      director: null,
      poster_url: "https://picsum.photos/seed/calendar-harbor/300/450",
      poster_blurhash: null,
      trailer_url: null,
      release_date: toIsoDate(addDays(anchor, 3)),
      platform_label: "Apple TV+",
      editorial_tier: "standard",
      release_state: "upcoming",
      date_changed_at: null,
      synopsis:
        "A coastal dispatch center receives emergency calls from boats that vanished years ago.",
      cast_json: ["Ivy Clarke", "Jordan West"],
    },
    {
      id: "mock-wirelight",
      title: "Wirelight",
      content_type: "movie",
      director: "Ada Park",
      poster_url: "https://picsum.photos/seed/calendar-wirelight/300/450",
      poster_blurhash: null,
      trailer_url: null,
      release_date: toIsoDate(addDays(anchor, -10)),
      platform_label: "Hulu",
      editorial_tier: "standard",
      release_state: "upcoming",
      date_changed_at: toIsoTimestamp(addDays(anchor, -20)),
      synopsis:
        "A systems engineer races to trace coordinated infrastructure failures before the city grid collapses.",
      cast_json: ["Sia North", "Dane Fox"],
    },
    {
      id: "mock-silent-meridian",
      title: "Silent Meridian",
      content_type: "series",
      director: "Theo Lyons",
      poster_url: null,
      poster_blurhash: null,
      trailer_url: null,
      release_date: toIsoDate(addDays(anchor, 12)),
      platform_label: "Prime Video",
      editorial_tier: "standard",
      release_state: "upcoming",
      date_changed_at: toIsoTimestamp(addDays(anchor, -1)),
      synopsis:
        "A cartographer is commissioned to map a coastline that appears and disappears overnight.",
      cast_json: ["June Park", "Milo Rae"],
    },
    {
      id: "mock-archive-run",
      title: "Archive Run",
      content_type: "movie",
      director: "Nia Graves",
      poster_url: "https://picsum.photos/seed/calendar-archive/300/450",
      poster_blurhash: null,
      trailer_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      release_date: toIsoDate(addDays(anchor, 20)),
      platform_label: "Max",
      editorial_tier: "tierA",
      release_state: "upcoming",
      date_changed_at: null,
      synopsis:
        "In a near-future logistics corridor, a courier is tasked with transporting a sealed archive before dawn.",
      cast_json: ["Evan Cole", "Priya Moss"],
    },
    {
      id: "mock-gritline",
      title: "Gritline",
      content_type: "series",
      director: "Mina Ortiz",
      poster_url: "https://picsum.photos/seed/calendar-gritline/300/450",
      poster_blurhash: null,
      trailer_url: null,
      release_date: toIsoDate(addDays(anchor, 27)),
      platform_label: "Netflix",
      editorial_tier: "standard",
      release_state: "upcoming",
      date_changed_at: null,
      synopsis:
        "A commuter rail incident uncovers a hidden network rewriting records across three states.",
      cast_json: ["Noah Day", "Ruby Hale"],
    },
  ];

  return items.sort((a, b) => a.release_date.localeCompare(b.release_date));
};
