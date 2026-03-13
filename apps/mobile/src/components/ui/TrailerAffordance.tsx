import { MaterialIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";

export const isExpoWebBrowserAvailable = true;

interface TrailerAffordanceProps {
  trailerUrl?: string | null;
}

export function TrailerAffordance({ trailerUrl }: TrailerAffordanceProps) {
  const { colors, tokens } = useThemeTokens();

  if (!trailerUrl) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          void WebBrowser.openBrowserAsync(trailerUrl);
        }}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Watch trailer"
      >
        <MaterialIcons name="play-arrow" size={14} color={colors.textSecondary} />
        <Text style={[tokens.typography.supporting, { color: colors.textSecondary }]}>
          Watch trailer
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    minHeight: 30,
  },
});
