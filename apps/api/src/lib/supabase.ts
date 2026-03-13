import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env.js";

let cachedClient: SupabaseClient | null = null;

export const getSupabaseServerClient = () => {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error("Supabase server env is not configured.");
  }

  if (!cachedClient) {
    cachedClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return cachedClient;
};
