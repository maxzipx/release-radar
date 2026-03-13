import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";
import { ScreenContainer } from "@/components/ui/ScreenContainer";

export function CalendarScreen() {
  return (
    <ScreenContainer
      title="Calendar"
      description="This tab is a placeholder for the future release calendar experience."
    >
      <PlaceholderPanel
        eyebrow="Phase 0"
        title="Calendar shell is ready"
        description="Routing, shared UI, and future service wiring are in place, but no calendar logic has been implemented yet."
        items={[
          "No release timeline logic yet",
          "No filters, date math, or saved state yet",
          "Ready for the next UI foundation pass",
        ]}
      />
    </ScreenContainer>
  );
}
