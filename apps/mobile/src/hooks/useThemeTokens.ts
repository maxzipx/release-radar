import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { getThemeColors, tokens } from "@/config/tokens";

export const useThemeTokens = () => {
  const scheme = useColorScheme();

  const colors = useMemo(() => getThemeColors(scheme), [scheme]);

  return {
    colors,
    scheme: scheme ?? "light",
    tokens,
  } as const;
};
