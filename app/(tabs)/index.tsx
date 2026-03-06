import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ReleaseCard } from '@/components/release/ReleaseCard';
import { ScreenHeader } from '@/components/release/ScreenHeader';
import { palette } from '@/constants/theme';
import { releases } from '@/data/releases';
import { getCurrentMonthLabel, getTimelineSections } from '@/lib/releases';

export default function TimelineScreen() {
  const sections = getTimelineSections(releases);
  const currentMonthLabel = getCurrentMonthLabel(new Date());

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          eyebrow="Release Radar"
          title="Cultural release calendar"
          description={`A curated snapshot of 2026 worth paying attention to. ${currentMonthLabel} opens by default, but the full year is ready to scan.`}
          statLabel="Tracked titles"
          statValue={String(releases.length)}
        />

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionMeta}>{section.items.length} releases</Text>
            </View>

            {section.items.map((release) => (
              <ReleaseCard key={release.id} release={release} featured={release.isMajorRelease} />
            ))}
          </View>
        ))}
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
  section: {
    marginTop: 26,
  },
  sectionHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 26,
    fontWeight: '700',
  },
  sectionMeta: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '600',
  },
});
