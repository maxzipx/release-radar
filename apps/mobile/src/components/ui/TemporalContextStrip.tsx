import { StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";

interface TemporalContextStripProps {
  currentWeekLabel: string;
  releasesThisWeek: number;
  savedReleasingSoon: number;
}

export function TemporalContextStrip({
  currentWeekLabel,
  releasesThisWeek,
  savedReleasingSoon,
}: TemporalContextStripProps) {
  const { colors, tokens } = useThemeTokens();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.groupedSurface,
          borderColor: colors.separator,
          borderRadius: tokens.radii.md,
        },
      ]}
    >
      <Text style={[tokens.typography.metadata, { color: colors.textPrimary }]}>
        {currentWeekLabel}
      </Text>
      <Text style={[tokens.typography.metadata, { color: colors.textSecondary }]}>
        <Text style={tokens.typography.tabular}>{releasesThisWeek}</Text> releases this week ·{" "}
        <Text style={tokens.typography.tabular}>{savedReleasingSoon}</Text> saved releasing soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4,
  },
});
