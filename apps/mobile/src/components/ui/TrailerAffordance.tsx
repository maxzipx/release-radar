import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";

interface ExpoWebBrowserModule {
  openBrowserAsync: (url: string) => Promise<unknown>;
}

let webBrowser: ExpoWebBrowserModule | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const module = require("expo-web-browser") as ExpoWebBrowserModule;
  webBrowser = typeof module.openBrowserAsync === "function" ? module : null;
} catch {
  webBrowser = null;
}

export const isExpoWebBrowserAvailable = Boolean(webBrowser);

interface TrailerAffordanceProps {
  trailerUrl?: string | null;
}

export function TrailerAffordance({ trailerUrl }: TrailerAffordanceProps) {
  const { colors, tokens } = useThemeTokens();

  if (!trailerUrl) {
    return null;
  }

  const disabled = !isExpoWebBrowserAvailable;

  return (
    <View style={styles.container}>
      <Pressable
        disabled={disabled}
        onPress={() => {
          if (!webBrowser) {
            return;
          }

          void webBrowser.openBrowserAsync(trailerUrl);
        }}
        style={styles.button}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
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
