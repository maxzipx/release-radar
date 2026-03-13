import { StyleSheet, Text, View } from "react-native";
import { AnswerOptionRow } from "@/components/ui/AnswerOptionRow";
import { useThemeTokens } from "@/hooks";

interface TriviaCardProps {
  question: string;
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  isSubmitted: boolean;
  onSelectOption?: (index: number) => void;
}

export function TriviaCard({
  question,
  options,
  selectedIndex,
  correctIndex,
  isSubmitted,
  onSelectOption,
}: TriviaCardProps) {
  const { colors, tokens } = useThemeTokens();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.separator,
          borderRadius: tokens.radii.md,
        },
      ]}
    >
      <Text style={[tokens.typography.primaryLabel, { color: colors.textPrimary }]}>{question}</Text>
      <View style={styles.options}>
        {options.map((option, index) => {
          let state: "default" | "correct" | "incorrect" | "dimmed" = "default";

          if (isSubmitted) {
            if (index === correctIndex) {
              state = "correct";
            } else if (index === selectedIndex && selectedIndex !== correctIndex) {
              state = "incorrect";
            } else {
              state = "dimmed";
            }
          }

          return (
            <AnswerOptionRow
              key={`${question}-${index}`}
              label={String.fromCharCode(65 + index)}
              text={option}
              state={state}
              disabled={isSubmitted}
              onPress={() => onSelectOption?.(index)}
              showDivider={index < options.length - 1}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: "hidden",
    paddingTop: 12,
    gap: 12,
  },
  options: {
    marginTop: 2,
  },
});
