import type { PropsWithChildren } from "react";
import type { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeTokens } from "@/hooks";

interface ScreenContainerProps extends PropsWithChildren {
  title?: string;
  description?: string;
  scrollEnabled?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: Omit<ScrollViewProps, "contentContainerStyle">;
}

export function ScreenContainer({
  title,
  description,
  scrollEnabled = true,
  contentContainerStyle,
  scrollViewProps,
  children,
}: ScreenContainerProps) {
  const { colors, tokens } = useThemeTokens();

  const content = (
    <View style={[styles.content, { paddingHorizontal: tokens.layout.screenMargin }, contentContainerStyle]}>
      {title ? (
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
          {description ? (
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top", "left", "right"]}
    >
      {scrollEnabled ? (
        <ScrollView {...scrollViewProps} contentContainerStyle={styles.scrollContent}>{content}</ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  content: {
    gap: 24,
    paddingTop: 16,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
});
