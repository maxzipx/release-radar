import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";
import { ScreenContainer } from "@/components/ui/ScreenContainer";

export function PlayScreen() {
  return (
    <ScreenContainer
      title="Play"
      description="This tab reserves the future trivia surface without implementing any gameplay yet."
    >
      <PlaceholderPanel
        eyebrow="Phase 0"
        title="Trivia shell is ready"
        description="Navigation and service entry points are established so the trivia experience can be layered in later without reworking the app foundation."
        items={[
          "No question fetching yet",
          "No answer submission yet",
          "No streak or scoring logic yet",
        ]}
      />
    </ScreenContainer>
  );
}
