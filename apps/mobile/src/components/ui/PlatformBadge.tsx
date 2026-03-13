import { StyleSheet, Text } from "react-native";
import { useThemeTokens } from "@/hooks";

interface PlatformBadgeProps {
  label: string;
}

export function PlatformBadge({ label }: PlatformBadgeProps) {
  const { colors, tokens } = useThemeTokens();

  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={[tokens.typography.microLabel, styles.text, { color: colors.textTertiary }]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    maxWidth: 96,
    includeFontPadding: false,
  },
});
