import { releases } from '@/data/releases';

export function useReleases() {
  return { releases, loading: false as const };
}
