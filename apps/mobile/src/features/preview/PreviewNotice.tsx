import { StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";

export function PreviewNotice() {
  const { colors, tokens } = useThemeTokens();

  return (
    <View style={[styles.container, { backgroundColor: colors.fill, borderColor: colors.separator }]}>
      <Text style={[tokens.typography.microLabel, { color: colors.textSecondary }]}>
        UI Foundation Preview (Dev Only)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
});
