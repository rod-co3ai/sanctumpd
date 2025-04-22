import { createServerClient } from "@/lib/supabase"

export async function isUserAdmin(userId: string): Promise<boolean> {
  const supabase = createServerClient()

  const { data } = await supabase.from("profiles").select("role").eq("id", userId).single()

  return data?.role === "admin"
}

export async function setUserAsAdmin(userId: string): Promise<boolean> {
  const supabase = createServerClient()

  const { error } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userId)

  return !error
}
