import { useState } from "react";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { CalendarRow } from "@/components/ui/CalendarRow";
import { DateChangeSignal } from "@/components/ui/DateChangeSignal";
import { DetailSheet } from "@/components/ui/DetailSheet";
import { WeekGroup } from "@/components/ui/WeekGroup";
import { PreviewNotice } from "@/features/preview/PreviewNotice";
import { detailById, previewWeeks } from "@/features/preview/mockData";
import { useDemoSaveStore } from "@/state/demo-save-store";

export function CalendarPreviewContent() {
  const [openDetailId, setOpenDetailId] = useState<string | null>(null);
  const isSaved = useDemoSaveStore((state) => state.isSaved);
  const toggleSaved = useDemoSaveStore((state) => state.toggleSaved);

  const selectedDetail = openDetailId ? detailById[openDetailId] ?? null : null;

  return (
    <ScreenContainer
      title="Calendar"
      description="Week-grouped release rows, detail overlay, and save toggle behavior are preview-only in this mode."
    >
      <PreviewNotice />
      {previewWeeks.map((week) => (
        <WeekGroup key={week.label} title={week.label}>
          {week.rows.map((row) => {
            const rowProps = {
              title: row.title,
              releaseDateLabel: row.releaseDateLabel,
              metadataFields: row.metadataFields,
              platformLabel: row.platformLabel,
              posterUrl: row.posterUrl,
              posterBlurhash: row.posterBlurhash,
              editorialTier: row.editorialTier,
              isSaved: isSaved(row.id),
              onPress: () => setOpenDetailId(row.id),
              onToggleSave: () => toggleSaved(row.id),
            } as const;

            if (row.temporalState === "dateChanged") {
              return <DateChangeSignal key={row.id} {...rowProps} />;
            }

            return (
              <CalendarRow
                key={row.id}
                {...rowProps}
                temporalState={row.temporalState}
              />
            );
          })}
        </WeekGroup>
      ))}

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
