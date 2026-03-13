import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet, Text } from "react-native";
import { useThemeTokens } from "@/hooks";

interface MetadataLineProps {
  fields: string[];
  leadingColor?: string;
  style?: StyleProp<TextStyle>;
}

export function MetadataLine({ fields, leadingColor, style }: MetadataLineProps) {
  const { colors, tokens } = useThemeTokens();

  if (!fields.length) {
    return null;
  }

  const [first, ...rest] = fields;

  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={[tokens.typography.metadata, styles.line, { color: colors.textSecondary }, style]}
    >
      <Text style={[styles.tabular, tokens.typography.tabular, leadingColor ? { color: leadingColor } : null]}>
        {first}
      </Text>
      {rest.length ? ` · ${rest.join(" · ")}` : ""}
    </Text>
  );
}

const styles = StyleSheet.create({
  line: {
    includeFontPadding: false,
  },
  tabular: {
    includeFontPadding: false,
  },
});
