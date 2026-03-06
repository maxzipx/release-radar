import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/constants/theme';

import { FilterChip } from './FilterChip';

type FilterGroupProps = {
  onToggle: (value: string) => void;
  selected: string[];
  title: string;
  values: string[];
};

export function FilterGroup({ onToggle, selected, title, values }: FilterGroupProps) {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {values.map((value) => (
          <FilterChip
            key={value}
            label={value}
            active={selected.includes(value)}
            onPress={() => onToggle(value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  title: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
});
