import { config } from "dotenv";

config();

const readEnv = (key: string, fallback = "") => process.env[key]?.trim() || fallback;

const requireEnv = (key: string) => {
  const value = readEnv(key);

  if (!value) {
    throw new Error(`Missing required API environment variable: ${key}`);
  }

  return value;
};

const parseCorsOrigins = (value: string) => {
  const origins = value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    throw new Error("CORS_ORIGIN must include at least one explicit origin.");
  }

  if (origins.some((origin) => origin === "*")) {
    throw new Error('CORS_ORIGIN must not include "*". Use explicit origins only.');
  }

  return origins;
};

const supabaseUrl = requireEnv("SUPABASE_URL");
const supabaseServiceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
const corsOrigins = parseCorsOrigins(requireEnv("CORS_ORIGIN"));

export const env = {
  port: Number(readEnv("PORT", "8787")),
  supabaseUrl,
  supabaseServiceRoleKey,
  corsOrigins,
};
