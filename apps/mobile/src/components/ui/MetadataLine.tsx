import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet, Text } from "react-native";
import { useThemeTokens } from "@/hooks";

interface MetadataLineProps {
  fields: string[];
  leadingColor?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export function MetadataLine({
  fields,
  leadingColor,
  style,
  numberOfLines = 1,
}: MetadataLineProps) {
  const { colors, tokens } = useThemeTokens();

  if (!fields.length) {
    return null;
  }

  const [first, ...rest] = fields;

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      style={[tokens.typography.metadata, styles.line, { color: colors.textSecondary }]}
    >
      <Text
        style={[
          styles.tabular,
          tokens.typography.metadata,
          tokens.typography.tabular,
          leadingColor ? { color: leadingColor } : null,
        ]}
      >
        {first}
      </Text>
      {rest.length ? (
        <Text style={[styles.supplemental, tokens.typography.supporting, style]}>
          {` · ${rest.join(" · ")}`}
        </Text>
      ) : null}
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
  supplemental: {
    includeFontPadding: false,
  },
});
