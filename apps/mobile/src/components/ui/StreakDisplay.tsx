import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useReducedMotion, useThemeTokens } from "@/hooks";

interface StreakDisplayProps {
  streakCount: number;
}

export function StreakDisplay({ streakCount }: StreakDisplayProps) {
  const { colors, tokens } = useThemeTokens();
  const reduceMotion = useReducedMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const previousValue = useRef(streakCount);

  useEffect(() => {
    const hasIncremented = streakCount > previousValue.current;
    previousValue.current = streakCount;

    if (!hasIncremented || reduceMotion) {
      scale.setValue(1);
      return;
    }

    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.15,
        speed: 28,
        bounciness: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 24,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [reduceMotion, scale, streakCount]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          tokens.typography.display,
          tokens.typography.tabular,
          styles.value,
          { color: colors.textPrimary, transform: [{ scale }] },
        ]}
      >
        {streakCount}
      </Animated.Text>
      <Text style={[tokens.typography.microLabel, { color: colors.textSecondary }]}>streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minWidth: 72,
  },
  value: {
    includeFontPadding: false,
  },
});
