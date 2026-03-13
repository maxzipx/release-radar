import type { CalendarRowData, DetailSheetData } from "@/types/ui-foundation";

const poster = (seed: number) => `https://picsum.photos/seed/release-${seed}/300/450`;

export const previewWeeks: { label: string; rows: CalendarRowData[] }[] = [
  {
    label: "Week of Mar 16",
    rows: [
      {
        id: "rd-echoes",
        title: "Echoes of Summer",
        releaseDateLabel: "Mar 16",
        metadataFields: ["Ari Cohen"],
        platformLabel: "Theatrical",
        posterUrl: poster(16),
        editorialTier: "tierA",
        temporalState: "default",
      },
      {
        id: "rd-gritline",
        title: "Gritline",
        releaseDateLabel: "Mar 17",
        metadataFields: ["Mina Ortiz"],
        platformLabel: "Netflix",
        posterUrl: poster(17),
        editorialTier: "standard",
        temporalState: "today",
      },
      {
        id: "rd-harbor",
        title: "Harbor Station",
        releaseDateLabel: "Mar 18",
        metadataFields: ["Kai Bennett"],
        platformLabel: "Apple TV+",
        posterUrl: poster(18),
        editorialTier: "standard",
        temporalState: "dateChanged",
      },
    ],
  },
  {
    label: "Week of Mar 23",
    rows: [
      {
        id: "rd-archive",
        title: "Archive Run",
        releaseDateLabel: "Feb 28",
        metadataFields: ["Nia Graves"],
        platformLabel: "Max",
        posterUrl: poster(19),
        editorialTier: "standard",
        temporalState: "archived",
      },
      {
        id: "rd-null",
        title: "Silent Meridian",
        releaseDateLabel: "Mar 26",
        metadataFields: ["Theo Lyons"],
        platformLabel: "Prime Video",
        posterUrl: null,
        editorialTier: "standard",
        temporalState: "default",
      },
      {
        id: "rd-error",
        title: "Wirelight",
        releaseDateLabel: "Mar 27",
        metadataFields: ["Ada Park"],
        platformLabel: "Hulu",
        posterUrl: "https://invalid.release-dates.dev/poster.jpg",
        editorialTier: "standard",
        temporalState: "default",
      },
    ],
  },
];

export const detailById: Record<string, DetailSheetData> = {
  "rd-echoes": {
    id: "rd-echoes",
    title: "Echoes of Summer",
    releaseDateLabel: "Mar 16",
    metadataFields: ["Ari Cohen", "Drama"],
    platformLabel: "Theatrical",
    posterUrl: poster(16),
    synopsis:
      "A director returns to his hometown to confront a long-buried split between memory and history.",
    cast: ["Maya Son", "Leo Hart", "Tessa Quinn"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  "rd-gritline": {
    id: "rd-gritline",
    title: "Gritline",
    releaseDateLabel: "Mar 17",
    metadataFields: ["Mina Ortiz", "Thriller"],
    platformLabel: "Netflix",
    posterUrl: poster(17),
    synopsis:
      "A commuter rail incident exposes an underground network that has been rewriting local records for years.",
    cast: ["Noah Day", "Ruby Hale", "Samir Grant"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  "rd-harbor": {
    id: "rd-harbor",
    title: "Harbor Station",
    releaseDateLabel: "Mar 18",
    metadataFields: ["Kai Bennett", "Mystery"],
    platformLabel: "Apple TV+",
    posterUrl: poster(18),
    synopsis:
      "A small island police station receives calls from numbers that should not exist anymore.",
    cast: ["Ivy Clarke", "Jordan West", "D. Patel"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  "rd-archive": {
    id: "rd-archive",
    title: "Archive Run",
    releaseDateLabel: "Feb 28",
    metadataFields: ["Nia Graves", "Sci-fi"],
    platformLabel: "Max",
    posterUrl: poster(19),
    synopsis:
      "In the near future, a courier is hired to move a sealed archive between cities before dawn.",
    cast: ["Evan Cole", "Priya Moss", "Liam Cruz"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  "rd-null": {
    id: "rd-null",
    title: "Silent Meridian",
    releaseDateLabel: "Mar 26",
    metadataFields: ["Theo Lyons", "Drama"],
    platformLabel: "Prime Video",
    posterUrl: null,
    synopsis:
      "A mapmaker receives a final commission to chart a shoreline that has never appeared on record.",
    cast: ["June Park", "Milo Rae", "Isa Shah"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  "rd-error": {
    id: "rd-error",
    title: "Wirelight",
    releaseDateLabel: "Mar 27",
    metadataFields: ["Ada Park", "Action"],
    platformLabel: "Hulu",
    posterUrl: "https://invalid.release-dates.dev/poster.jpg",
    synopsis:
      "A forensic engineer traces a sabotage pattern through city infrastructure before a gridwide blackout.",
    cast: ["Sia North", "Dane Fox", "Ari Bloom"],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
};

export const previewTemporalContext = {
  currentWeekLabel: "Week of Mar 16",
  releasesThisWeek: 7,
  savedReleasingSoon: 2,
};

export const homePosterStrip = [
  { id: "strip-1", title: "Echoes of Summer", posterUrl: poster(31) },
  { id: "strip-2", title: "Harbor Station", posterUrl: poster(32) },
  { id: "strip-3", title: "Wirelight", posterUrl: poster(33) },
];

export const triviaPreview = {
  question: "Which release moved dates this week?",
  options: ["Echoes of Summer", "Harbor Station", "Archive Run", "Gritline"],
  correctIndex: 1,
};
