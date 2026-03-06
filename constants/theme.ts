import { Platform } from 'react-native';

export const palette = {
  accent: '#F6C978',
  accentMuted: '#8A6A31',
  background: '#111827',
  border: 'rgba(246, 201, 120, 0.18)',
  card: '#172235',
  chip: '#1D2B43',
  chipActive: '#2E4266',
  muted: '#A8B4C7',
  secondaryText: '#CBD5E1',
  surface: '#0F172A',
  text: '#F8FAFC',
};

export const shadows = {
  card:
    Platform.OS === 'web'
      ? {}
      : {
          elevation: 10,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.22,
          shadowRadius: 28,
        },
};
