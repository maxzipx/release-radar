import type { ColorSchemeName, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

interface ThemePalette {
  background: string;
  surface: string;
  groupedSurface: string;
  fill: string;
  fillTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  separator: string;
  highlight: string;
  accent: string;
  success: string;
  error: string;
  sheetBackdrop: string;
}

const lightColors: ThemePalette = {
  background: "#ffffff",
  surface: "#ffffff",
  groupedSurface: "#f2f2f7",
  fill: "#f2f2f7",
  fillTertiary: "rgba(118, 118, 128, 0.24)",
  textPrimary: "#000000",
  textSecondary: "#3c3c4399",
  textTertiary: "#3c3c434c",
  separator: "#3c3c434a",
  highlight: "#e5e5ea",
  accent: "#c45a2a",
  success: "#34c75933",
  error: "#ff3b3033",
  sheetBackdrop: "rgba(0, 0, 0, 0.4)",
} as const;

const darkColors: ThemePalette = {
  background: "#000000",
  surface: "#1c1c1e",
  groupedSurface: "#2c2c2e",
  fill: "#3a3a3c",
  fillTertiary: "rgba(118, 118, 128, 0.36)",
  textPrimary: "#ffffff",
  textSecondary: "#ebebf599",
  textTertiary: "#ebebf54c",
  separator: "#54545899",
  highlight: "#2c2c2e",
  accent: "#ff9f0a",
  success: "#30d15833",
  error: "#ff453a33",
  sheetBackdrop: "rgba(0, 0, 0, 0.5)",
} as const;

export type ThemeColors = ThemePalette;

export const tokens = {
  spacing: {
    unit: 4,
    micro: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  layout: {
    screenMargin: 20,
    metadataInset: 16,
  },
  motion: {
    micro: 120,
    fast: 200,
    medium: 240,
    sheetOpen: 280,
    max: 300,
    rowHighlight: 100,
    imageFadeIn: 200,
  },
  typography: {
    display: {
      fontSize: 28,
      fontWeight: "600",
      lineHeight: 34,
    } satisfies TextStyle,
    sectionHeader: {
      fontSize: 13,
      fontWeight: "600",
      letterSpacing: 0.78,
      textTransform: "uppercase",
    } satisfies TextStyle,
    primaryLabel: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 22,
    } satisfies TextStyle,
    metadata: {
      fontSize: 13,
      fontWeight: "400",
      lineHeight: 18,
    } satisfies TextStyle,
    supporting: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 16,
    } satisfies TextStyle,
    microLabel: {
      fontSize: 11,
      fontWeight: "400",
      letterSpacing: 0.55,
      textTransform: "uppercase",
    } satisfies TextStyle,
    tabular: {
      fontVariant: ["tabular-nums"],
    } satisfies TextStyle,
  },
  borderWidth: {
    hairline: StyleSheet.hairlineWidth,
    standard: 1,
  },
  colors: lightColors,
} as const;

export const getThemeColors = (scheme: ColorSchemeName): ThemeColors =>
  scheme === "dark" ? darkColors : lightColors;
