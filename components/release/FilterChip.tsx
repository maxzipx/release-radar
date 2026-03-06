import { Pressable, StyleSheet, Text } from 'react-native';

import { palette } from '@/constants/theme';

type FilterChipProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

export function FilterChip({ active, label, onPress }: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active ? styles.chipActive : undefined,
        pressed ? styles.chipPressed : undefined,
      ]}>
      <Text style={[styles.label, active ? styles.labelActive : undefined]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: palette.chip,
    borderColor: palette.border,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: palette.chipActive,
    borderColor: palette.accentMuted,
  },
  chipPressed: {
    opacity: 0.84,
  },
  label: {
    color: palette.secondaryText,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  labelActive: {
    color: palette.text,
  },
});
