import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/release/EmptyState';
import { ReleaseCard } from '@/components/release/ReleaseCard';
import { ScreenHeader } from '@/components/release/ScreenHeader';
import { palette } from '@/constants/theme';
import { releases } from '@/data/releases';
import { formatDateRangeLabel, getThisWeekReleases } from '@/lib/releases';

export default function ThisWeekScreen() {
  const now = new Date();
  const upcoming = getThisWeekReleases(releases, now);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          eyebrow="This Week"
          title="Next seven days"
          description={`${formatDateRangeLabel(now)}. A quick-scan list for checking what is landing next.`}
          statLabel="Coming up"
          statValue={String(upcoming.length)}
        />

        <View style={styles.wrap}>
          {upcoming.length === 0 ? (
            <EmptyState
              title="Nothing drops in the next seven days"
              description="That quiet patch is useful signal too. Shift to Browse to scan the next month or quarter."
            />
          ) : (
            upcoming.map((release) => <ReleaseCard key={release.id} release={release} />)
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
