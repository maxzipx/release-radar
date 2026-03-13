import {
  FlashList,
  type FlashListRef,
  type ListRenderItemInfo,
} from "@shopify/flash-list";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  InteractionManager,
  RefreshControl,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { CalendarRow } from "@/components/ui/CalendarRow";
import { DateChangeSignal } from "@/components/ui/DateChangeSignal";
import { DetailSheet } from "@/components/ui/DetailSheet";
import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { WeekGroup } from "@/components/ui/WeekGroup";
import { useCalendarFeed } from "@/features/calendar/hooks/useCalendarFeed";
import type { CalendarWeekGroupModel } from "@/features/calendar/model/calendar-model";
import { useSaveStore } from "@/state/save-store";

export function CalendarScreen() {
  const [openDetailId, setOpenDetailId] = useState<string | null>(null);
  const {
    currentWeekKey,
    detailById,
    errorMessage,
    isRefreshing,
    loadBackward,
    loadForward,
    refresh,
    status,
    weekGroups,
  } = useCalendarFeed();
  const isSaved = useSaveStore((state) => state.isSaved);
  const toggleSaved = useSaveStore((state) => state.toggleSaved);
  const listRef = useRef<FlashListRef<CalendarWeekGroupModel>>(null);
  const didInitialScrollRef = useRef(false);
  const lastBackwardLoadRef = useRef(0);

  const targetWeekIndex = useMemo(() => {
    if (!weekGroups.length) {
      return -1;
    }

    const currentIndex = weekGroups.findIndex((group) => group.key === currentWeekKey);

    if (currentIndex >= 0) {
      return currentIndex;
    }

    const nextIndex = weekGroups.findIndex((group) => group.key > currentWeekKey);
    return nextIndex >= 0 ? nextIndex : 0;
  }, [currentWeekKey, weekGroups]);

  useEffect(() => {
    if (didInitialScrollRef.current || targetWeekIndex < 0 || !weekGroups.length) {
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
  }, [targetWeekIndex, weekGroups.length]);

  const selectedDetail = openDetailId ? detailById[openDetailId] ?? null : null;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (event.nativeEvent.contentOffset.y > 120) {
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

  const renderWeek = useCallback(
    ({ item }: ListRenderItemInfo<CalendarWeekGroupModel>) => (
      <WeekGroup title={item.label}>
        {item.rows.map((row) => {
          const rowProps = {
            title: row.row.title,
            releaseDateLabel: row.row.releaseDateLabel,
            metadataFields: row.row.metadataFields,
            platformLabel: row.row.platformLabel,
            posterUrl: row.row.posterUrl,
            posterBlurhash: row.row.posterBlurhash,
            editorialTier: row.row.editorialTier,
            isSaved: isSaved(row.id),
            onPress: () => setOpenDetailId(row.id),
            onToggleSave: () => toggleSaved(row.id),
          } as const;

          if (row.row.temporalState === "dateChanged") {
            return <DateChangeSignal key={row.id} {...rowProps} />;
          }

          return (
            <CalendarRow
              key={row.id}
              {...rowProps}
              temporalState={row.row.temporalState}
            />
          );
        })}
      </WeekGroup>
    ),
    [isSaved, toggleSaved],
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
        data={weekGroups}
        renderItem={renderWeek}
        keyExtractor={(item) => item.key}
        getItemType={() => "week-group"}
        onEndReachedThreshold={0.45}
        onEndReached={loadForward}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
  emptyContainer: {
    paddingTop: 24,
  },
});
