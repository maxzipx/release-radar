import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/constants/theme';

type HeatScoreProps = {
  score: 1 | 2 | 3 | 4 | 5;
};

export function HeatScore({ score }: HeatScoreProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Heat</Text>
      <View style={styles.icons}>
        {Array.from({ length: score }).map((_, index) => (
          <Ionicons key={index} name="flame" size={12} color={palette.accent} />
        ))}
      </View>
      <Text style={styles.score}>{score}/5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'flex-start',
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  label: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  icons: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 4,
  },
  score: {
    color: palette.secondaryText,
    fontSize: 11,
    marginTop: 4,
  },
});
