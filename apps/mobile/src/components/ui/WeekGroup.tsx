import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useThemeTokens } from "@/hooks";

interface WeekGroupProps extends PropsWithChildren {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export function WeekGroup({ title, style, children }: WeekGroupProps) {
  const { tokens } = useThemeTokens();

  return (
    <View style={[styles.container, { marginBottom: tokens.spacing.lg }, style]}>
      <SectionHeader label={title} />
      <View style={styles.rows}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  rows: {
    gap: 0,
  },
});
