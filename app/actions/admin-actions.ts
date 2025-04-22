"use server"

import { createServerClient } from "@/lib/supabase"
import { isUserAdmin } from "@/lib/admin-utils"
import { revalidatePath } from "next/cache"

export async function approveAccessRequest(requestId: string) {
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

  // Get the access request
  const { data: request, error: requestError } = await supabase
    .from("access_requests")
    .select("user_id, status")
    .eq("id", requestId)
    .single()

  if (requestError || !request) {
    return { success: false, message: "Access request not found" }
  }

  if (request.status !== "pending") {
    return { success: false, message: "Access request already processed" }
  }

  // Update the access request status
  const { error: updateError } = await supabase
    .from("access_requests")
    .update({ status: "approved" })
    .eq("id", requestId)

  if (updateError) {
    return { success: false, message: "Failed to update access request" }
  }

  // Update the user's profile to set access_granted to true
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ access_granted: true })
    .eq("id", request.user_id)

  if (profileError) {
    return { success: false, message: "Failed to update user profile" }
  }

  revalidatePath("/admin/access-requests")

  return { success: true, message: "Access request approved successfully" }
}

export async function rejectAccessRequest(requestId: string) {
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

  // Get the access request
  const { data: request, error: requestError } = await supabase
    .from("access_requests")
    .select("status")
    .eq("id", requestId)
    .single()

  if (requestError || !request) {
    return { success: false, message: "Access request not found" }
  }

  if (request.status !== "pending") {
    return { success: false, message: "Access request already processed" }
  }

  // Update the access request status
  const { error: updateError } = await supabase
    .from("access_requests")
    .update({ status: "rejected" })
    .eq("id", requestId)

  if (updateError) {
    return { success: false, message: "Failed to update access request" }
  }

  revalidatePath("/admin/access-requests")

  return { success: true, message: "Access request rejected successfully" }
}

export async function setAdminRole(userId: string) {
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

  // Update the user's profile to set role to admin
  const { error } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userId)

  if (error) {
    return { success: false, message: "Failed to update user role" }
  }

  revalidatePath("/admin/users")

  return { success: true, message: "User role updated to admin successfully" }
}
