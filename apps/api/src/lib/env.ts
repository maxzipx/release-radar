import { config } from "dotenv";

config();

const readEnv = (key: string, fallback = "") => process.env[key]?.trim() || fallback;

export const env = {
  port: Number(readEnv("PORT", "8787")),
  supabaseUrl: readEnv("SUPABASE_URL"),
  supabaseServiceRoleKey: readEnv("SUPABASE_SERVICE_ROLE_KEY"),
  corsOrigin: readEnv("CORS_ORIGIN", "*"),
};

export const apiSupabaseConfig = {
  isConfigured: Boolean(env.supabaseUrl && env.supabaseServiceRoleKey),
};
