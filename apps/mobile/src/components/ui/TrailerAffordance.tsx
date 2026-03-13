import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";

interface ExpoWebBrowserModule {
  openBrowserAsync: (url: string) => Promise<unknown>;
}

// Static require so Metro includes expo-web-browser in the bundle when installed.
// Falls back to null if the package is absent.
let webBrowserModule: ExpoWebBrowserModule | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("expo-web-browser") as ExpoWebBrowserModule;
  webBrowserModule = typeof mod.openBrowserAsync === "function" ? mod : null;
} catch {
  webBrowserModule = null;
}

export const isExpoWebBrowserAvailable = Boolean(webBrowserModule);

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
          if (!webBrowserModule) {
            return;
          }

          void webBrowserModule.openBrowserAsync(trailerUrl);
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
      {disabled ? (
        <Text style={[tokens.typography.microLabel, { color: colors.textTertiary }]}>
          expo-web-browser not installed
        </Text>
      ) : null}
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
