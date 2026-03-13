import { PlaceholderPanel } from "@/components/ui/PlaceholderPanel";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { envStatus } from "@/config/env";
import { useAppStore } from "@/state/app-store";

export function HomeScreen() {
  const hydrationStatus = useAppStore((state) => state.hydrationStatus);
  const hydrationError = useAppStore((state) => state.hydrationError);

  return (
    <ScreenContainer
      title="Home"
      description="Phase 0 focuses on scaffolding only, so this screen intentionally proves the app shell without shipping feature UI."
    >
      <PlaceholderPanel
        eyebrow="Foundation"
        title="Scaffold check"
        description="The mobile shell is wired with Expo Router, a shared provider stack, placeholder UI primitives, and future-facing service folders."
        items={[
          `Provider hydration: ${hydrationStatus}`,
          `Hydration error: ${hydrationError ?? "none"}`,
          `API env configured: ${envStatus.apiConfigured ? "yes" : "no"}`,
          `Supabase env configured: ${envStatus.supabaseConfigured ? "yes" : "no"}`,
        ]}
      />
    </ScreenContainer>
  );
}
