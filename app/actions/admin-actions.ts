"use server"

import { createServerClient } from "@/lib/supabase"
import { isUserAdmin } from "@/lib/admin-utils"
import { cookies } from "next/headers"

export async function updateAccessRequestStatus(requestId: string, status: string) {
  const supabase = createServerClient()

  // Get the current user
  const cookieStore = cookies()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      success: false,
      message: "You must be logged in to perform this action",
    }
  }

  // Check if user is admin
  const isAdmin = await isUserAdmin(session.user.id)
  if (!isAdmin) {
    return {
      success: false,
      message: "You don't have permission to perform this action",
    }
  }

  // Update the access request status
  const { error } = await supabase.from("access_requests").update({ status }).eq("id", requestId)

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  // If approved, we could create a user account here
  // This would involve creating an auth user and sending an invite email
  if (status === "approved") {
    // Get the access request details
    const { data: accessRequest } = await supabase.from("access_requests").select("*").eq("id", requestId).single()

    if (accessRequest) {
      // In a real application, you would create a user account and send an invite email
      // For now, we'll just log this
      console.log(`Access request approved for ${accessRequest.email}`)
    }
  }

  return {
    success: true,
    message: `Access request ${status} successfully`,
  }
}

export async function updateUserRole(userId: string, role: string) {
  const supabase = createServerClient()

  // Get the current user
  const cookieStore = cookies()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      success: false,
      message: "You must be logged in to perform this action",
    }
  }

  // Check if user is admin
  const isAdmin = await isUserAdmin(session.user.id)
  if (!isAdmin) {
    return {
      success: false,
      message: "You don't have permission to perform this action",
    }
  }

  // Update the user role
  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId)

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    message: `User role updated to ${role} successfully`,
  }
}
