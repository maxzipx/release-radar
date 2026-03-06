import { StyleSheet, Text, View } from 'react-native';

import { palette, shadows } from '@/constants/theme';

type ScreenHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  statLabel: string;
  statValue: string;
};

export function ScreenHeader({
  description,
  eyebrow,
  statLabel,
  statValue,
  title,
}: ScreenHeaderProps) {
  return (
    <View style={styles.shell}>
      <View style={styles.heroGlow} />
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>{statLabel}</Text>
        <Text style={styles.statValue}>{statValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: palette.card,
    borderColor: palette.border,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 24,
    overflow: 'hidden',
    padding: 22,
    position: 'relative',
    ...shadows.card,
  },
  heroGlow: {
    backgroundColor: 'rgba(246, 201, 120, 0.16)',
    borderRadius: 999,
    height: 160,
    position: 'absolute',
    right: -50,
    top: -40,
    width: 160,
  },
  eyebrow: {
    color: palette.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    color: palette.text,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
    maxWidth: 280,
  },
  description: {
    color: palette.secondaryText,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 12,
    maxWidth: 520,
  },
  statCard: {
    alignSelf: 'flex-start',
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '700',
  },
});
