import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { useReducedMotion, useThemeTokens } from "@/hooks";

interface SaveToggleProps {
  isSaved: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function SaveToggle({ isSaved, onToggle, disabled = false }: SaveToggleProps) {
  const { colors, tokens } = useThemeTokens();
  const reduceMotion = useReducedMotion();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduceMotion) {
      scale.setValue(1);
      return;
    }

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: tokens.motion.micro / 2,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: tokens.motion.micro / 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSaved, reduceMotion, scale, tokens.motion.micro]);

  return (
    <Pressable
      disabled={disabled}
      hitSlop={10}
      onPress={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      style={styles.pressable}
      accessibilityRole="button"
      accessibilityLabel={isSaved ? "Unsave title" : "Save title"}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <MaterialIcons
          name={isSaved ? "bookmark" : "bookmark-border"}
          size={22}
          color={colors.textPrimary}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    minHeight: 30,
    minWidth: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
