import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <SafeAreaView edges={['top']} style={styles.container}>
        <Text style={styles.eyebrow}>Release Radar</Text>
        <Text style={styles.title}>This screen does not exist.</Text>
        <Text style={styles.copy}>
          The route may have changed while the app structure was being updated for a shared web and iOS shell.
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to Timeline</Text>
        </Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: palette.background,
  },
  eyebrow: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  title: {
    color: palette.text,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
  },
  copy: {
    color: palette.secondaryText,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 420,
  },
  link: {
    marginTop: 20,
    paddingVertical: 14,
  },
  linkText: {
    color: palette.accent,
    fontSize: 15,
    fontWeight: '600',
  },
});
