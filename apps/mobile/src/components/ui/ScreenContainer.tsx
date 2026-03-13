import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/config/tokens";

interface ScreenContainerProps extends PropsWithChildren {
  title: string;
  description: string;
}

export function ScreenContainer({
  title,
  description,
  children,
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  content: {
    gap: tokens.spacing.lg,
    padding: tokens.spacing.lg,
  },
  header: {
    gap: tokens.spacing.xs,
  },
  title: {
    color: tokens.colors.text,
    fontSize: 28,
    fontWeight: "700",
  },
  description: {
    color: tokens.colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
});
