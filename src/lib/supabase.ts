import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function assertEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Env ausente: ${name}`);
  }
}

let cachedAnonClient: SupabaseClient | null = null;
let cachedServiceClient: SupabaseClient | null = null;

export function getSupabaseAnonClient(): SupabaseClient {
  assertEnv("SUPABASE_URL", SUPABASE_URL);
  assertEnv("SUPABASE_ANON_KEY", SUPABASE_ANON_KEY);

  if (!cachedAnonClient) {
    cachedAnonClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return cachedAnonClient;
}

export function getSupabaseServiceClient(): SupabaseClient {
  assertEnv("SUPABASE_URL", SUPABASE_URL);
  assertEnv("SUPABASE_SERVICE_ROLE_KEY", SUPABASE_SERVICE_ROLE_KEY);

  if (!cachedServiceClient) {
    cachedServiceClient = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return cachedServiceClient;
}
