import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeTokens } from "@/hooks";

interface ExpoWebBrowserModule {
  openBrowserAsync: (url: string) => Promise<unknown>;
}

const loadExpoWebBrowser = (): ExpoWebBrowserModule | null => {
  try {
    const dynamicRequire = Function(
      "return typeof require !== 'undefined' ? require : null;",
    )() as ((moduleName: string) => unknown) | null;

    if (!dynamicRequire) {
      return null;
    }

    const module = dynamicRequire("expo-web-browser") as ExpoWebBrowserModule;
    return typeof module.openBrowserAsync === "function" ? module : null;
  } catch {
    return null;
  }
};

const webBrowserModule = loadExpoWebBrowser();

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
