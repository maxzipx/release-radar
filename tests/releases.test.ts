import { releases } from '@/data/releases';
import {
  applyReleaseFilters,
  formatReleaseDateLabel,
  getFilterOptions,
  getThisWeekReleases,
  getTimelineSections,
} from '@/lib/releases';

describe('release helpers', () => {
  it('groups releases into timeline sections', () => {
    const sections = getTimelineSections(releases);

    expect(sections[0]?.title).toBe('March');
    expect(sections.some((section) => section.title === 'Q4')).toBe(true);
  });

  it('filters by platform and type together', () => {
    const filtered = applyReleaseFilters(releases, {
      genres: [],
      platforms: ['Apple TV+'],
      types: ['tv'],
      windows: [],
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((release) => release.platform === 'Apple TV+' && release.type === 'tv')).toBe(true);
  });

  it('builds browse options from the dataset', () => {
    const options = getFilterOptions(releases);

    expect(options.types).toEqual(['film', 'tv']);
    expect(options.platforms).toContain('Theaters');
    expect(options.windows).toContain('Q4');
  });

  it('formats confirmed and quarter-based dates safely', () => {
    expect(formatReleaseDateLabel(releases[0])).toBe('Mar 6');
    expect(formatReleaseDateLabel(releases[2])).toBe('Q1 TBA');
  });

  it('returns only releases in the next seven days', () => {
    const thisWeek = getThisWeekReleases(releases, new Date(2026, 2, 5, 12));

    expect(thisWeek.map((release) => release.slug)).toEqual(['mickey-17', 'project-hail-mary']);
  });
});
