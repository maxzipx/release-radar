import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/release/EmptyState';
import { FilterGroup } from '@/components/release/FilterGroup';
import { ReleaseCard } from '@/components/release/ReleaseCard';
import { ScreenHeader } from '@/components/release/ScreenHeader';
import { palette } from '@/constants/theme';
import { useReleases } from '@/hooks/useReleases';
import { useSessionFilters } from '@/hooks/useSessionFilters';
import { applyReleaseFilters, getFilterOptions } from '@/lib/releases';

export default function BrowseScreen() {
  const { releases } = useReleases();
  const { filters, clearFilters, loaded, toggleFilter } = useSessionFilters();
  const options = getFilterOptions(releases);
  const [searchQuery, setSearchQuery] = useState('');

  const visibleReleases = applyReleaseFilters(releases, filters).filter((release) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      release.title.toLowerCase().includes(q) ||
      release.shortDescription.toLowerCase().includes(q) ||
      release.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          eyebrow="Browse"
          title="Filter the year"
          description="Trim the slate by format, platform, genre, and release window. Your filter state is retained for this session."
          statLabel="Visible"
          statValue={String(visibleReleases.length)}
        />

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={palette.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title, description, or tag..."
            placeholderTextColor={palette.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        <View style={styles.filterWrap}>
          <View style={styles.filterTopRow}>
            <Text style={styles.filterTitle}>Always-visible filters</Text>
            {loaded ? (
              <Text style={styles.clear} onPress={clearFilters}>
                Clear all
              </Text>
            ) : null}
          </View>

          <FilterGroup
            title="Type"
            values={options.types}
            selected={filters.types}
            onToggle={(value) => toggleFilter('types', value)}
          />
          <FilterGroup
            title="Platform"
            values={options.platforms}
            selected={filters.platforms}
            onToggle={(value) => toggleFilter('platforms', value)}
          />
          <FilterGroup
            title="Genre"
            values={options.genres}
            selected={filters.genres}
            onToggle={(value) => toggleFilter('genres', value)}
          />
          <FilterGroup
            title="Window"
            values={options.windows}
            selected={filters.windows}
            onToggle={(value) => toggleFilter('windows', value)}
          />
        </View>

        {visibleReleases.length === 0 ? (
          <EmptyState
            title="No titles match this filter mix"
            description="Try clearing one or two chip groups to widen the release window."
          />
        ) : (
          visibleReleases.map((release) => <ReleaseCard key={release.id} release={release} compact />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingBottom: 120,
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 14,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: palette.text,
    fontSize: 16,
    fontWeight: '500',
  },
  filterWrap: {
    backgroundColor: palette.card,
    borderColor: palette.border,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 22,
    padding: 18,
  },
  filterTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  clear: {
    color: palette.accent,
    fontSize: 13,
    fontWeight: '600',
  },
});
