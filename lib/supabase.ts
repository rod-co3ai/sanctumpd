import { createClient } from "@supabase/supabase-js"

// Create a singleton instance of the Supabase client for client-side usage
let clientSingleton: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (clientSingleton) return clientSingleton

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  clientSingleton = createClient(supabaseUrl, supabaseAnonKey)
  return clientSingleton
}

// For server-side operations that need admin privileges
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase admin environment variables")
  }

  // Create client with additional options
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  })
}
