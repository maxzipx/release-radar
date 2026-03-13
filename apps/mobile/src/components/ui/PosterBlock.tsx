import { Image } from "expo-image";
import { useMemo, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { useReducedMotion, useThemeTokens } from "@/hooks";
import type { PosterStateOverride } from "@/types/ui-foundation";

interface PosterBlockProps {
  imageUrl?: string | null;
  blurhash?: string | null;
  borderRadius?: number;
  width?: number;
  height?: number;
  aspectRatio?: number;
  stateOverride?: PosterStateOverride;
  style?: StyleProp<ViewStyle>;
}

type InternalLoadState = "loading" | "loaded" | "error";

export function PosterBlock({
  imageUrl,
  blurhash,
  borderRadius = 8,
  width,
  height,
  aspectRatio = 2 / 3,
  stateOverride = "auto",
  style,
}: PosterBlockProps) {
  const { colors, tokens } = useThemeTokens();
  const reduceMotion = useReducedMotion();
  const [loadState, setLoadState] = useState<InternalLoadState>("loading");

  const effectiveState = useMemo(() => {
    if (stateOverride !== "auto") {
      return stateOverride;
    }

    if (!imageUrl) {
      return "nullFallback";
    }

    if (loadState === "error") {
      return "errorFallback";
    }

    if (loadState === "loaded") {
      return "loaded";
    }

    return "loading";
  }, [imageUrl, loadState, stateOverride]);

  const shouldRenderImage =
    Boolean(imageUrl) &&
    effectiveState !== "nullFallback" &&
    effectiveState !== "errorFallback" &&
    stateOverride !== "loading";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.fill,
          borderRadius,
          width,
          height,
          aspectRatio,
        },
        style,
      ]}
    >
      {shouldRenderImage ? (
        <Image
          source={imageUrl}
          placeholder={blurhash ?? undefined}
          contentFit="cover"
          style={[StyleSheet.absoluteFillObject, { borderRadius }]}
          transition={reduceMotion ? 150 : tokens.motion.imageFadeIn}
          onLoadStart={() => setLoadState("loading")}
          onLoad={() => setLoadState("loaded")}
          onError={() => setLoadState("error")}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flexShrink: 0,
  },
});
