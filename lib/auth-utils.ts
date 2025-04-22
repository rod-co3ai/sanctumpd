import { createServerClient } from "@/lib/supabase"

export async function checkUserAccess(userId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("profiles").select("access_granted").eq("id", userId).single()

  if (error) {
    console.error("Error checking user access:", error)
    return false
  }

  return data?.access_granted || false
}
