const readEnv = (key: string) => process.env[key]?.trim() ?? "";

export const env = {
  apiUrl: readEnv("EXPO_PUBLIC_API_URL"),
  supabaseUrl: readEnv("EXPO_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: readEnv("EXPO_PUBLIC_SUPABASE_ANON_KEY"),
};

export const envStatus = {
  apiConfigured: Boolean(env.apiUrl),
  supabaseConfigured: Boolean(env.supabaseUrl && env.supabaseAnonKey),
};
