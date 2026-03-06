import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/constants/theme';

type EmptyStateProps = {
  description: string;
  title: string;
};

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <View style={styles.shell}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: palette.card,
    borderColor: palette.border,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  title: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: palette.secondaryText,
    fontSize: 15,
    lineHeight: 24,
  },
});
