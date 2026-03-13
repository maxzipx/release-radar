import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";
import type { TriviaOptionState } from "@/types/ui-foundation";

interface AnswerOptionRowProps {
  label: string;
  text: string;
  state: TriviaOptionState;
  disabled?: boolean;
  onPress?: () => void;
  showDivider?: boolean;
}

export function AnswerOptionRow({
  label,
  text,
  state,
  disabled = false,
  onPress,
  showDivider = true,
}: AnswerOptionRowProps) {
  const { colors, tokens } = useThemeTokens();

  const backgroundColor =
    state === "correct"
      ? colors.success
      : state === "incorrect"
        ? colors.error
        : colors.groupedSurface;

  const textColor =
    state === "dimmed" ? colors.textTertiary : colors.textPrimary;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.row,
        {
          backgroundColor,
          borderBottomWidth: showDivider ? tokens.borderWidth.hairline : 0,
          borderBottomColor: colors.separator,
        },
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <View style={styles.content}>
        <Text style={[tokens.typography.microLabel, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[tokens.typography.metadata, { color: textColor }]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
