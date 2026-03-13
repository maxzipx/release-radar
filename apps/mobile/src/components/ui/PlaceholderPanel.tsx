import { StyleSheet, Text, View } from "react-native";
import { tokens } from "@/config/tokens";

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
  return (
    <View style={styles.panel}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.list}>
        {items.map((item) => (
          <Text key={item} style={styles.item}>
            - {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: tokens.spacing.sm,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.lg,
  },
  eyebrow: {
    color: tokens.colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    color: tokens.colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    color: tokens.colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    gap: tokens.spacing.xs,
    marginTop: tokens.spacing.sm,
  },
  item: {
    color: tokens.colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
