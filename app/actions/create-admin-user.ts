"use server"

import { createServerClient } from "@/lib/supabase"
import { randomUUID } from "crypto"

export async function createAdminUser(formData: FormData) {
  const supabase = createServerClient()
  const email = formData.get("email") as string
  const password = (formData.get("password") as string) || randomUUID().substring(0, 8)

  try {
    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
      user_metadata: {
        full_name: "Rod Wilson",
      },
    })

    if (authError) {
      return {
        success: false,
        message: `Error creating user: ${authError.message}`,
      }
    }

    // Set the user as admin in the profiles table
    const { error: profileError } = await supabase.from("profiles").update({ role: "admin" }).eq("id", authData.user.id)

    if (profileError) {
      return {
        success: false,
        message: `Error setting admin role: ${profileError.message}`,
      }
    }

    return {
      success: true,
      message: `Admin user created successfully with email ${email}. Password: ${password}`,
      userId: authData.user.id,
    }
  } catch (error) {
    console.error("Error in createAdminUser:", error)
    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
