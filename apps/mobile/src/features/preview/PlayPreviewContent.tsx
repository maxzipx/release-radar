import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HomeModuleCard } from "@/components/ui/HomeModuleCard";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StreakDisplay } from "@/components/ui/StreakDisplay";
import { TriviaCard } from "@/components/ui/TriviaCard";
import { PreviewNotice } from "@/features/preview/PreviewNotice";
import { triviaPreview } from "@/features/preview/mockData";
import { useThemeTokens } from "@/hooks";

export function PlayPreviewContent() {
  const { colors, tokens } = useThemeTokens();
  const [streakCount, setStreakCount] = useState(7);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <ScreenContainer
      title="Play"
      description="Trivia and streak UI states are mocked for primitive verification only."
    >
      <PreviewNotice />

      <HomeModuleCard>
        <View style={styles.streakRow}>
          <StreakDisplay streakCount={streakCount} />
          <Pressable
            onPress={() => setStreakCount((value) => value + 1)}
            style={[styles.button, { borderColor: colors.separator, backgroundColor: colors.groupedSurface }]}
          >
            <Text style={[tokens.typography.supporting, { color: colors.textPrimary }]}>
              Increment streak
            </Text>
          </Pressable>
        </View>
      </HomeModuleCard>

      <View style={{ gap: 8 }}>
        <SectionHeader label="Unanswered" />
        <TriviaCard
          question={triviaPreview.question}
          options={triviaPreview.options}
          selectedIndex={null}
          correctIndex={triviaPreview.correctIndex}
          isSubmitted={false}
        />
      </View>

      <View style={{ gap: 8 }}>
        <SectionHeader label="Interactive" />
        <TriviaCard
          question={triviaPreview.question}
          options={triviaPreview.options}
          selectedIndex={selectedIndex}
          correctIndex={triviaPreview.correctIndex}
          isSubmitted={isSubmitted}
          onSelectOption={(index) => {
            if (isSubmitted) {
              return;
            }

            setSelectedIndex(index);
            setIsSubmitted(true);
          }}
        />
        <View style={styles.controls}>
          <Pressable
            style={[styles.button, { borderColor: colors.separator, backgroundColor: colors.groupedSurface }]}
            onPress={() => {
              setSelectedIndex(null);
              setIsSubmitted(false);
            }}
          >
            <Text style={[tokens.typography.supporting, { color: colors.textPrimary }]}>Reset</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <SectionHeader label="Answered Correct (Locked)" />
        <TriviaCard
          question={triviaPreview.question}
          options={triviaPreview.options}
          selectedIndex={triviaPreview.correctIndex}
          correctIndex={triviaPreview.correctIndex}
          isSubmitted
        />
      </View>

      <View style={{ gap: 8 }}>
        <SectionHeader label="Answered Incorrect (Locked)" />
        <TriviaCard
          question={triviaPreview.question}
          options={triviaPreview.options}
          selectedIndex={(triviaPreview.correctIndex + 1) % triviaPreview.options.length}
          correctIndex={triviaPreview.correctIndex}
          isSubmitted
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 40,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
});
