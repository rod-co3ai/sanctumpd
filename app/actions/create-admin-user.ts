"use server"

import { createServerClient } from "@/lib/supabase"
import { isUserAdmin } from "@/lib/admin-utils"
import { revalidatePath } from "next/cache"

export async function createAdminUser(formData: FormData) {
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return { success: false, message: "Not authenticated" }
  }

  // Check if user is admin
  const isAdmin = await isUserAdmin(session.user.id)
  if (!isAdmin) {
    return { success: false, message: "Not authorized" }
  }

  const email = formData.get("email") as string

  if (!email) {
    return { success: false, message: "Email is required" }
  }

  // Check if user exists
  const { data: existingUser, error: userError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("email", email)
    .single()

  if (userError && userError.code !== "PGRST116") {
    return { success: false, message: "Error checking user existence" }
  }

  if (existingUser) {
    if (existingUser.role === "admin") {
      return { success: false, message: "User is already an admin" }
    }

    // Update existing user to admin
    const { error: updateError } = await supabase.from("profiles").update({ role: "admin" }).eq("id", existingUser.id)

    if (updateError) {
      return { success: false, message: "Failed to update user role" }
    }

    revalidatePath("/admin/users")
    return { success: true, message: "User role updated to admin successfully" }
  }

  return { success: false, message: "User not found. They must register first." }
}
