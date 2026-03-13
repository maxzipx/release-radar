import { StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";

interface PlaceholderPanelProps {
  eyebrow?: string;
  title: string;
  description: string;
  items: string[];
}

export function PlaceholderPanel({
  eyebrow,
  title,
  description,
  items,
}: PlaceholderPanelProps) {
  const { colors, tokens } = useThemeTokens();

  return (
    <View
      style={[
        styles.panel,
        {
          borderColor: colors.separator,
          borderRadius: tokens.radii.md,
          backgroundColor: colors.surface,
        },
      ]}
    >
      {eyebrow ? (
        <Text style={[styles.eyebrow, { color: colors.accent }]}>{eyebrow}</Text>
      ) : null}
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
      <View style={styles.list}>
        {items.map((item, index) => (
          <Text key={`${title}-${index}`} style={[styles.item, { color: colors.textPrimary }]}>
            - {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    gap: 12,
    padding: 24,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    gap: 8,
    marginTop: 12,
  },
  item: {
    fontSize: 14,
    lineHeight: 20,
  },
});
