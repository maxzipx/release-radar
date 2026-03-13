import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";

interface SectionHeaderProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}

export function SectionHeader({ label, style }: SectionHeaderProps) {
  const { colors, tokens } = useThemeTokens();

  return (
    <View style={[styles.container, { backgroundColor: colors.fill }, style]}>
      <Text style={[tokens.typography.sectionHeader, styles.text, { color: colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  text: {
    includeFontPadding: false,
  },
});
