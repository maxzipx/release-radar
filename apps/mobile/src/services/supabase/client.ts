import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, envStatus } from "@/config/env";

// Lazy singleton scoped to a closure — avoids mutable module-level state.
export const getSupabaseClient = (() => {
  let client: SupabaseClient | null = null;

  return () => {
    if (!envStatus.supabaseConfigured) {
      throw new Error("Supabase mobile env is not configured.");
    }

    if (!client) {
      client = createClient(env.supabaseUrl, env.supabaseAnonKey);
    }

    return client;
  };
})();
