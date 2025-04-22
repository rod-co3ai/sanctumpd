import { createServerClient } from "@/lib/supabase"

export async function isUserAdmin(userId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).single()

  if (error) {
    console.error("Error checking admin status:", error)
    return false
  }

  return data?.role === "admin"
}

export async function getAccessRequests() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("access_requests").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching access requests:", error)
    return []
  }

  return data
}

export async function getUsers() {
  const supabase = createServerClient()

  const { data: users, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
    return []
  }

  return users
}
