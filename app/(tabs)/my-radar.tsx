import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/release/EmptyState';
import { ReleaseCard } from '@/components/release/ReleaseCard';
import { ScreenHeader } from '@/components/release/ScreenHeader';
import { palette } from '@/constants/theme';
import { useReleases } from '@/hooks/useReleases';
import { useWatchlist } from '@/hooks/useWatchlist';

export default function MyRadarScreen() {
  const { savedIds } = useWatchlist();
  const { releases } = useReleases();
  const savedReleases = releases.filter((release) => savedIds.includes(release.id));

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          eyebrow="My Radar"
          title="Saved drops"
          description="Your personal watchlist of highly anticipated releases."
          statLabel="Tracked"
          statValue={String(savedReleases.length)}
        />

        <View style={styles.wrap}>
          {savedReleases.length === 0 ? (
            <EmptyState
              title="Nothing on your radar yet"
              description="Browse the timeline and tap Save on any release to keep it here for quick access."
            />
          ) : (
            savedReleases.map((release) => <ReleaseCard key={release.id} release={release} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingBottom: 120,
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  wrap: {
    gap: 14,
  },
});
