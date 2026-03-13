import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "@/lib/query-client";
import { useAppStore } from "@/state/app-store";

export function AppProviders({ children }: PropsWithChildren) {
  const setHydrationState = useAppStore((state) => state.setHydrationState);

  useEffect(() => {
    let isActive = true;

    const initializeProviders = async () => {
      setHydrationState("loading");

      try {
        await Promise.resolve(queryClient);

        if (isActive) {
          setHydrationState("ready");
        }
      } catch (error) {
        if (isActive) {
          const message =
            error instanceof Error ? error.message : "App providers failed to initialize.";
          setHydrationState("error", message);
        }
      }
    };

    void initializeProviders();

    return () => {
      isActive = false;
    };
  }, [setHydrationState]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SafeAreaProvider>
  );
}
