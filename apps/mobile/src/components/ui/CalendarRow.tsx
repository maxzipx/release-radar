import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getDateEmphasisTreatment } from "@/components/ui/EmphasisBadge";
import { MetadataLine } from "@/components/ui/MetadataLine";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { PosterBlock } from "@/components/ui/PosterBlock";
import { SaveToggle } from "@/components/ui/SaveToggle";
import { useReducedMotion, useThemeTokens } from "@/hooks";
import type { CalendarTemporalState, EditorialTier } from "@/types/ui-foundation";

interface CalendarRowProps {
  title: string;
  releaseDateLabel: string;
  metadataFields: string[];
  platformLabel: string;
  posterUrl?: string | null;
  posterBlurhash?: string | null;
  temporalState?: CalendarTemporalState;
  editorialTier?: EditorialTier;
  isSaved: boolean;
  onPress: () => void;
  onToggleSave: () => void;
}

export function CalendarRow({
  title,
  releaseDateLabel,
  metadataFields,
  platformLabel,
  posterUrl,
  posterBlurhash,
  temporalState = "default",
  editorialTier = "standard",
  isSaved,
  onPress,
  onToggleSave,
}: CalendarRowProps) {
  const { colors, tokens } = useThemeTokens();
  const reduceMotion = useReducedMotion();
  const [highlighted, setHighlighted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;
  const treatment = getDateEmphasisTreatment(temporalState, colors);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Pressable
      style={[
        styles.row,
        {
          backgroundColor: highlighted ? colors.highlight : "transparent",
          minHeight: editorialTier === "tierA" ? 80 : 72,
          paddingVertical: editorialTier === "tierA" ? 10 : 8,
        },
      ]}
      onPress={() => {
        setHighlighted(true);

        const delay = reduceMotion ? 0 : tokens.motion.rowHighlight;

        timeoutRef.current = setTimeout(() => {
          setHighlighted(false);
          onPressRef.current();
        }, delay);
      }}
      accessibilityRole="button"
      accessibilityLabel={`Open details for ${title}`}
    >
      <PosterBlock
        imageUrl={posterUrl}
        blurhash={posterBlurhash}
        width={40}
        height={56}
        borderRadius={tokens.radii.sm}
      />

      <View style={styles.content}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[tokens.typography.primaryLabel, { color: colors.textPrimary }]}
        >
          {title}
        </Text>
        <MetadataLine
          fields={[releaseDateLabel, ...metadataFields]}
          leadingColor={treatment.dateColor}
          style={tokens.typography.tabular}
        />
        {treatment.microLabel ? (
          <Text style={[tokens.typography.microLabel, { color: colors.textSecondary }]}>
            {treatment.microLabel}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightCluster}>
        <PlatformBadge label={platformLabel} />
        <SaveToggle isSaved={isSaved} onToggle={onToggleSave} />
      </View>

      <View
        style={[
          styles.separator,
          {
            backgroundColor: colors.separator,
            height: tokens.borderWidth.hairline,
            left: 76,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 0,
    position: "relative",
  },
  content: {
    flex: 1,
    gap: 4,
    paddingLeft: 4,
  },
  rightCluster: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    minHeight: 52,
    paddingVertical: 2,
  },
  separator: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
