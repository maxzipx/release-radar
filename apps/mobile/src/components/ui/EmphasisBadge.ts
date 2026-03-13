import type { ThemeColors } from "@/config/tokens";
import type { CalendarTemporalState } from "@/types/ui-foundation";

interface DateEmphasisTreatment {
  dateColor: string;
  microLabel?: string;
}

export const getDateEmphasisTreatment = (
  temporalState: CalendarTemporalState,
  colors: ThemeColors,
): DateEmphasisTreatment => {
  if (temporalState === "today") {
    return {
      dateColor: colors.accent,
    };
  }

  if (temporalState === "archived") {
    return {
      dateColor: colors.textTertiary,
    };
  }

  if (temporalState === "dateChanged") {
    return {
      dateColor: colors.accent,
      microLabel: "Date updated",
    };
  }

  return {
    dateColor: colors.textSecondary,
  };
};
