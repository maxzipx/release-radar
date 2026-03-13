import type { ComponentProps } from "react";
import { CalendarRow } from "@/components/ui/CalendarRow";

type CalendarRowProps = ComponentProps<typeof CalendarRow>;

type DateChangeSignalProps = Omit<CalendarRowProps, "temporalState">;

export function DateChangeSignal(props: DateChangeSignalProps) {
  return <CalendarRow {...props} temporalState="dateChanged" />;
}
