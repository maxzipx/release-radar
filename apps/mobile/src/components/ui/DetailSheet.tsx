import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { MetadataLine } from "@/components/ui/MetadataLine";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { PosterBlock } from "@/components/ui/PosterBlock";
import { SaveToggle } from "@/components/ui/SaveToggle";
import { TrailerAffordance } from "@/components/ui/TrailerAffordance";
import { useThemeTokens } from "@/hooks";
import type { DetailSheetData } from "@/types/ui-foundation";

interface DetailSheetProps {
  visible: boolean;
  item: DetailSheetData | null;
  isSaved: boolean;
  onDismiss: () => void;
  onToggleSave: () => void;
}

export function DetailSheet({
  visible,
  item,
  isSaved,
  onDismiss,
  onToggleSave,
}: DetailSheetProps) {
  const { colors, tokens } = useThemeTokens();

  if (!item) {
    return null;
  }

  const platformLabel = (item.platformLabel ?? "").trim();
  const synopsis = (item.synopsis ?? "").trim();
  const castNames = (item.cast ?? [])
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  return (
    <BottomSheet visible={visible} onDismiss={onDismiss} expandable>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: tokens.layout.screenMargin,
            paddingBottom: tokens.spacing.xl,
          },
        ]}
      >
        <PosterBlock
          imageUrl={item.posterUrl}
          blurhash={item.posterBlurhash}
          aspectRatio={2 / 3}
          borderRadius={tokens.radii.md}
          style={styles.heroPoster}
        />

        <View style={styles.titleRow}>
          <Text style={[tokens.typography.display, { color: colors.textPrimary, flex: 1 }]}>
            {item.title}
          </Text>
          <SaveToggle isSaved={isSaved} onToggle={onToggleSave} />
        </View>

        {platformLabel ? <PlatformBadge label={platformLabel} /> : null}
        <MetadataLine
          fields={[item.releaseDateLabel, ...item.metadataFields]}
          numberOfLines={2}
          style={tokens.typography.supporting}
        />

        {synopsis ? (
          <Text style={[tokens.typography.supporting, { color: colors.textSecondary }]}>
            {synopsis}
          </Text>
        ) : null}

        <TrailerAffordance trailerUrl={item.trailerUrl} />

        {castNames.length ? (
          <Text style={[tokens.typography.supporting, { color: colors.textSecondary }]}>
            Cast: {castNames.join(", ")}
          </Text>
        ) : null}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
  },
  heroPoster: {
    width: "100%",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
});
