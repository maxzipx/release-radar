import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, envStatus } from "@/config/env";

let cachedClient: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (!envStatus.supabaseConfigured) {
    throw new Error("Supabase mobile env is not configured.");
  }

  if (!cachedClient) {
    cachedClient = createClient(env.supabaseUrl, env.supabaseAnonKey);
  }

  return cachedClient;
};
