"use server"

import { getSupabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createUser(email: string, password: string) {
  try {
    const supabase = getSupabaseAdmin()

    // Create the user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
    })

    if (error) {
      console.error("Error creating user:", error)
      return { success: false, message: error.message }
    }

    revalidatePath("/login")

    return {
      success: true,
      message: "User created successfully",
      user: data.user,
    }
  } catch (error) {
    console.error("Unexpected error creating user:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

export async function approveAccessRequest(requestId: string, email: string, password: string) {
  try {
    const supabase = getSupabaseAdmin()

    // First create the user
    const userResult = await createUser(email, password)

    if (!userResult.success) {
      return userResult
    }

    // Then update the access request status
    const { error } = await supabase.from("access_requests").update({ status: "Granted" }).eq("id", requestId)

    if (error) {
      console.error("Error updating access request:", error)
      return { success: false, message: error.message }
    }

    return {
      success: true,
      message: "Access request approved and user created",
      user: userResult.user,
    }
  } catch (error) {
    console.error("Unexpected error approving access request:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
