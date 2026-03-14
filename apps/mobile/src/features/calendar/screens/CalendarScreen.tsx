import {
  FlashList,
  type FlashListRef,
  type ListRenderItemInfo,
  type ViewToken,
} from "@shopify/flash-list";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  InteractionManager,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { CalendarRow } from "@/components/ui/CalendarRow";
import { DateChangeSignal } from "@/components/ui/DateChangeSignal";
import { DetailSheet } from "@/components/ui/DetailSheet";
import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { WeekGroup } from "@/components/ui/WeekGroup";
import { useCalendarFeed } from "@/features/calendar/hooks/useCalendarFeed";
import type { CalendarListItem } from "@/features/calendar/model/calendar-model";
import { useThemeTokens } from "@/hooks";
import { useSaveStore } from "@/state/save-store";

export function CalendarScreen() {
  const [openDetailId, setOpenDetailId] = useState<string | null>(null);
  const { tokens } = useThemeTokens();
  const {
    currentWeekKey,
    detailById,
    errorMessage,
    isRefreshing,
    listItems,
    loadBackward,
    loadForward,
    refresh,
    status,
  } = useCalendarFeed();
  const savedById = useSaveStore((state) => state.savedById);
  const toggleSaved = useSaveStore((state) => state.toggleSaved);
  const isSaved = useCallback((id: string) => Boolean(savedById[id]), [savedById]);
  const weekSpacing = tokens.spacing.lg;
  const listRef = useRef<FlashListRef<CalendarListItem>>(null);
  const didInitialScrollRef = useRef(false);
  const lastBackwardLoadRef = useRef(0);

  const targetWeekIndex = useMemo(() => {
    if (!listItems.length) {
      return -1;
    }

    const currentIndex = listItems.findIndex(
      (item) => item.type === "week-header" && item.weekKey === currentWeekKey,
    );

    if (currentIndex >= 0) {
      return currentIndex;
    }

    const nextIndex = listItems.findIndex(
      (item) => item.type === "week-header" && item.weekKey > currentWeekKey,
    );
    return nextIndex >= 0 ? nextIndex : 0;
  }, [currentWeekKey, listItems]);

  useEffect(() => {
    if (didInitialScrollRef.current || targetWeekIndex < 0 || !listItems.length) {
      return;
    }

    const task = InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(() => {
        try {
          listRef.current?.scrollToIndex({
            index: targetWeekIndex,
            animated: false,
          });
        } catch {
          listRef.current?.scrollToOffset({
            offset: 0,
            animated: false,
          });
        }
        didInitialScrollRef.current = true;
      });
    });

    return () => task.cancel();
  }, [listItems.length, targetWeekIndex]);

  const selectedDetail = openDetailId ? detailById[openDetailId] ?? null : null;

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<CalendarListItem>[] }) => {
      let minWeekIndex = Number.POSITIVE_INFINITY;

      for (const token of viewableItems) {
        if (!token.isViewable || !token.item) {
          continue;
        }

        minWeekIndex = Math.min(minWeekIndex, token.item.weekIndex);
      }

      if (!Number.isFinite(minWeekIndex) || minWeekIndex > 2) {
        return;
      }

      const now = Date.now();
      if (now - lastBackwardLoadRef.current < 800) {
        return;
      }

      lastBackwardLoadRef.current = now;
      loadBackward();
    },
    [loadBackward],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CalendarListItem>) => {
      if (item.type === "week-header") {
        return <WeekGroup title={item.label} style={styles.weekHeaderOnly} />;
      }

      const rowProps = {
        title: item.row.row.title,
        releaseDateLabel: item.row.row.releaseDateLabel,
        metadataFields: item.row.row.metadataFields,
        platformLabel: item.row.row.platformLabel,
        posterUrl: item.row.row.posterUrl,
        posterBlurhash: item.row.row.posterBlurhash,
        editorialTier: item.row.row.editorialTier,
        isSaved: isSaved(item.row.id),
        onPress: () => setOpenDetailId(item.row.id),
        onToggleSave: () => toggleSaved(item.row.id),
      } as const;

      const content =
        item.row.row.temporalState === "dateChanged" ? (
          <DateChangeSignal {...rowProps} />
        ) : (
          <CalendarRow {...rowProps} temporalState={item.row.row.temporalState} />
        );

      return (
        <View style={item.isLastInWeek ? { marginBottom: weekSpacing } : undefined}>
          {content}
        </View>
      );
    },
    [isSaved, toggleSaved, weekSpacing],
  );

  const listEmptyState = useMemo(() => {
    if (status === "loading") {
      return (
        <PlaceholderPanel
          eyebrow="Loading"
          title="Loading releases"
          description="Fetching this week and upcoming releases."
          items={[]}
        />
      );
    }

    if (status === "error") {
      return (
        <PlaceholderPanel
          eyebrow="Calendar"
          title="Couldn't load releases"
          description={errorMessage ?? "Pull down to try again."}
          items={[]}
        />
      );
    }

    return (
      <PlaceholderPanel
        eyebrow="Calendar"
        title="Nothing scheduled yet"
        description="The calendar will fill in as release dates are confirmed. Check back soon."
        items={[]}
      />
    );
  }, [errorMessage, status]);

  return (
    <ScreenContainer title="Calendar" scrollEnabled={false} contentContainerStyle={styles.content}>
      <FlashList
        ref={listRef}
        data={listItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        getItemType={(item) => item.type}
        overrideProps={{ estimatedItemSize: 76 }}
        onEndReachedThreshold={0.45}
        onEndReached={loadForward}
        onViewableItemsChanged={handleViewableItemsChanged}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        ListEmptyComponent={<View style={styles.emptyContainer}>{listEmptyState}</View>}
      />

      <DetailSheet
        visible={Boolean(selectedDetail)}
        item={selectedDetail}
        isSaved={openDetailId ? isSaved(openDetailId) : false}
        onDismiss={() => setOpenDetailId(null)}
        onToggleSave={() => {
          if (openDetailId) {
            toggleSaved(openDetailId);
          }
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 8,
    paddingBottom: 0,
  },
  listContent: {
    paddingBottom: 24,
  },
  weekHeaderOnly: {
    marginBottom: 0,
  },
  emptyContainer: {
    paddingTop: 24,
  },
});
