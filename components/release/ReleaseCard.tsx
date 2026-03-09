import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Linking,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { palette, shadows } from '@/constants/theme';
import { useWatchlist } from '@/hooks/useWatchlist';
import { formatReleaseDateLabel } from '@/lib/releases';
import type { Release } from '@/lib/types';

import { HeatScore } from './HeatScore';

type ReleaseCardProps = {
  compact?: boolean;
  featured?: boolean;
  release: Release;
};

export function ReleaseCard({ compact = false, featured = false, release }: ReleaseCardProps) {
  const { isSaved, toggleSaved } = useWatchlist();
  const saved = isSaved(release.id);
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  function handleToggle() {
    if (Platform.OS !== 'web') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    setExpanded((current) => !current);
  }

  async function handleTrailerPress() {
    if (!release.trailerUrl) {
      return;
    }

    await Linking.openURL(release.trailerUrl);
  }

  async function handleSharePress() {
    try {
      await Share.share({
        message: `Don't miss ${release.title} dropping on ${formatReleaseDateLabel(release)}! Track it on Release Radar.`,
      });
    } catch (error) {
      console.error('Error sharing', error);
    }
  }

  const shouldShowImage = Boolean(release.posterUrl) && !imageFailed;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${release.title} release card`}
      onPress={handleToggle}
      style={({ pressed }) => [
        styles.card,
        compact ? styles.compactCard : undefined,
        featured ? styles.featuredCard : undefined,
        pressed ? styles.pressed : undefined,
      ]}>
      <View style={styles.topRow}>
        <View style={[styles.posterWrap, compact ? styles.posterCompact : undefined]}>
          {shouldShowImage ? (
            <Image
              source={{ uri: release.posterUrl }}
              style={styles.poster}
              resizeMode="cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <View style={styles.posterFallback}>
              <Text style={styles.posterEyebrow}>{release.type.toUpperCase()}</Text>
              <Text style={styles.posterTitle}>{release.title}</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.headingRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{release.title}</Text>
              {release.seasonLabel ? <Text style={styles.season}>{release.seasonLabel}</Text> : null}
            </View>
            <HeatScore score={release.heatScore} />
          </View>

          <View style={styles.badgeRow}>
            <Text style={styles.badge}>{formatReleaseDateLabel(release)}</Text>
            <Text style={styles.badge}>{release.type === 'film' ? 'Film' : 'TV'}</Text>
            <Text style={styles.badge}>{release.platform}</Text>
          </View>

          <Text style={styles.description}>{release.shortDescription}</Text>
        </View>
      </View>

      {expanded ? (
        <View style={styles.expanded}>
          <Text style={styles.blurb}>{release.editorialBlurb}</Text>

          <View style={styles.tagRow}>
            {release.tags.map((tag) => (
              <Text key={tag} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.genreLine}>{release.genres.join(' • ')}</Text>

            <View style={styles.actionRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={saved ? `Remove ${release.title} from My Radar` : `Save ${release.title} to My Radar`}
                onPress={() => toggleSaved(release.id)}
                style={({ pressed }) => [styles.bookmarkBtn, pressed ? styles.pressedAction : undefined]}>
                <Ionicons
                  name={saved ? 'bookmark' : 'bookmark-outline'}
                  size={18}
                  color={saved ? palette.accent : palette.text}
                />
                <Text style={[styles.bookmarkText, saved ? styles.bookmarkTextSaved : undefined]}>
                  {saved ? 'Saved' : 'Save'}
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Share ${release.title}`}
                onPress={handleSharePress}
                style={({ pressed }) => [styles.bookmarkBtn, pressed ? styles.pressedAction : undefined]}>
                <Ionicons name="share-outline" size={18} color={palette.text} />
                <Text style={styles.bookmarkText}>Share</Text>
              </Pressable>

              <Text
                accessibilityRole={release.trailerUrl ? 'link' : 'text'}
                onPress={release.trailerUrl ? handleTrailerPress : undefined}
                style={[styles.trailerLink, !release.trailerUrl ? styles.trailerDisabled : undefined]}>
                {release.trailerUrl ? 'Watch trailer' : 'Trailer pending'}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderColor: palette.border,
    borderRadius: 26,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
    padding: 16,
    ...shadows.card,
  },
  compactCard: {
    padding: 14,
  },
  featuredCard: {
    borderColor: 'rgba(246, 201, 120, 0.42)',
    backgroundColor: '#1A2740',
  },
  pressed: {
    opacity: 0.92,
  },
  topRow: {
    flexDirection: 'row',
    gap: 14,
  },
  posterWrap: {
    borderRadius: 22,
    height: 162,
    overflow: 'hidden',
    width: 112,
  },
  posterCompact: {
    height: 144,
    width: 98,
  },
  poster: {
    height: '100%',
    width: '100%',
  },
  posterFallback: {
    backgroundColor: '#24354F',
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  posterEyebrow: {
    color: palette.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  posterTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  headingRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
    paddingRight: 6,
  },
  title: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26,
  },
  season: {
    color: palette.accent,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  badge: {
    color: palette.secondaryText,
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 999,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: palette.secondaryText,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 14,
  },
  expanded: {
    borderTopColor: palette.border,
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 14,
  },
  blurb: {
    color: palette.text,
    fontSize: 15,
    lineHeight: 24,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  tag: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  genreLine: {
    color: palette.secondaryText,
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  trailerLink: {
    color: palette.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  trailerDisabled: {
    color: palette.muted,
  },
  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  bookmarkBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  bookmarkText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '700',
  },
  bookmarkTextSaved: {
    color: palette.accent,
  },
  pressedAction: {
    opacity: 0.6,
  },
});
