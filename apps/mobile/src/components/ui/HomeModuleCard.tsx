import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { useThemeTokens } from "@/hooks";

interface HomeModuleCardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export function HomeModuleCard({ children, style }: HomeModuleCardProps) {
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
        style,
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
