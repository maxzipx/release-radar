const normalizeFlag = (value: string | undefined) => value?.trim().toLowerCase();

const previewFlag = normalizeFlag(process.env.EXPO_PUBLIC_UI_FOUNDATION_PREVIEW);

export const featureFlags = {
  uiFoundationPreview: previewFlag
    ? previewFlag === "true"
    : __DEV__,
} as const;
