import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CalendarRow } from "@/components/ui/CalendarRow";
import { HomeModuleCard } from "@/components/ui/HomeModuleCard";
import { PosterBlock } from "@/components/ui/PosterBlock";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TemporalContextStrip } from "@/components/ui/TemporalContextStrip";
import { PreviewNotice } from "@/features/preview/PreviewNotice";
import { homePosterStrip, previewTemporalContext, previewWeeks } from "@/features/preview/mockData";
import { useThemeTokens } from "@/hooks";
import { useDemoSaveStore } from "@/state/demo-save-store";

export function HomePreviewContent() {
  const { colors, tokens } = useThemeTokens();
  const isSaved = useDemoSaveStore((state) => state.isSaved);
  const toggleSaved = useDemoSaveStore((state) => state.toggleSaved);

  const soonRows = previewWeeks[0]?.rows.slice(0, 2) ?? [];
  const dateChangedRows = previewWeeks.flatMap((week) =>
    week.rows.filter((row) => row.temporalState === "dateChanged"),
  );

  return (
    <ScreenContainer
      title="Home"
      description="Editorial context modules are preview-only and scoped to primitive verification."
    >
      <PreviewNotice />

      <TemporalContextStrip
        currentWeekLabel={previewTemporalContext.currentWeekLabel}
        releasesThisWeek={previewTemporalContext.releasesThisWeek}
        savedReleasingSoon={previewTemporalContext.savedReleasingSoon}
      />

      <View style={{ gap: tokens.spacing.xl }}>
        <View style={{ gap: 8 }}>
          <SectionHeader label="Poster States" />
          <HomeModuleCard>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.posterStrip}>
              <View style={styles.posterColumn}>
                <PosterBlock
                  imageUrl={homePosterStrip[0]?.posterUrl}
                  width={80}
                  height={120}
                  borderRadius={tokens.radii.sm}
                  stateOverride="loaded"
                />
                <Text style={[tokens.typography.supporting, { color: colors.textPrimary }]}>Loaded</Text>
              </View>
              <View style={styles.posterColumn}>
                <PosterBlock
                  imageUrl={homePosterStrip[1]?.posterUrl}
                  width={80}
                  height={120}
                  borderRadius={tokens.radii.sm}
                  stateOverride="loading"
                />
                <Text style={[tokens.typography.supporting, { color: colors.textPrimary }]}>Loading</Text>
              </View>
              <View style={styles.posterColumn}>
                <PosterBlock
                  imageUrl={null}
                  width={80}
                  height={120}
                  borderRadius={tokens.radii.sm}
                  stateOverride="nullFallback"
                />
                <Text style={[tokens.typography.supporting, { color: colors.textPrimary }]}>No Image</Text>
              </View>
              <View style={styles.posterColumn}>
                <PosterBlock
                  imageUrl="https://invalid.release-dates.dev/poster.jpg"
                  width={80}
                  height={120}
                  borderRadius={tokens.radii.sm}
                  stateOverride="errorFallback"
                />
                <Text style={[tokens.typography.supporting, { color: colors.textPrimary }]}>Load Error</Text>
              </View>
            </ScrollView>
          </HomeModuleCard>
        </View>

        <View style={{ gap: 8 }}>
          <SectionHeader label="Major Releases" />
          <HomeModuleCard>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.posterStrip}>
              {homePosterStrip.map((item) => (
                <View key={item.id} style={styles.posterColumn}>
                  <PosterBlock
                    imageUrl={item.posterUrl}
                    width={80}
                    height={120}
                    borderRadius={tokens.radii.sm}
                  />
                  <Text
                    numberOfLines={2}
                    style={[tokens.typography.supporting, { color: colors.textPrimary, maxWidth: 84 }]}
                  >
                    {item.title}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </HomeModuleCard>
        </View>

        <View style={{ gap: 8 }}>
          <SectionHeader label="Saved Releasing Soon" />
          <HomeModuleCard>
            {soonRows.map((row) => (
              <CalendarRow
                key={`home-${row.id}`}
                title={row.title}
                releaseDateLabel={row.releaseDateLabel}
                metadataFields={row.metadataFields}
                platformLabel={row.platformLabel}
                posterUrl={row.posterUrl}
                posterBlurhash={row.posterBlurhash}
                temporalState={row.temporalState}
                editorialTier={row.editorialTier}
                isSaved={isSaved(row.id)}
                onToggleSave={() => toggleSaved(row.id)}
                onPress={() => undefined}
              />
            ))}
          </HomeModuleCard>
        </View>

        <View style={{ gap: 8 }}>
          <SectionHeader label="Date Updates" />
          <HomeModuleCard>
            {dateChangedRows.map((row) => (
              <CalendarRow
                key={`date-${row.id}`}
                title={row.title}
                releaseDateLabel={row.releaseDateLabel}
                metadataFields={row.metadataFields}
                platformLabel={row.platformLabel}
                posterUrl={row.posterUrl}
                posterBlurhash={row.posterBlurhash}
                temporalState="dateChanged"
                editorialTier={row.editorialTier}
                isSaved={isSaved(row.id)}
                onToggleSave={() => toggleSaved(row.id)}
                onPress={() => undefined}
              />
            ))}
          </HomeModuleCard>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  posterStrip: {
    gap: 12,
    paddingRight: 8,
  },
  posterColumn: {
    gap: 6,
    maxWidth: 84,
  },
});
