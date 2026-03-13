import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeTokens } from "@/hooks";

export function HomeModuleCard({ children }: PropsWithChildren) {
  const { colors, tokens } = useThemeTokens();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.groupedSurface,
          borderColor: colors.separator,
          borderRadius: tokens.radii.md,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 12,
    gap: 12,
  },
});
