export type ReleaseType = 'film' | 'tv';
export type ReleaseStatus = 'confirmed' | 'tba-quarter';
export type ReleaseQuarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export type Release = {
  id: string;
  slug: string;
  title: string;
  releaseDate: string;
  releaseStatus: ReleaseStatus;
  releaseQuarter: ReleaseQuarter;
  type: ReleaseType;
  seasonLabel: string;
  platform: string;
  genres: string[];
  heatScore: 1 | 2 | 3 | 4 | 5;
  shortDescription: string;
  editorialBlurb: string;
  posterUrl: string;
  trailerUrl: string;
  tags: string[];
  isMajorRelease: boolean;
};

export type ReleaseFilters = {
  genres: string[];
  platforms: string[];
  types: string[];
  windows: string[];
};

export type TimelineSection = {
  title: string;
  items: Release[];
};
