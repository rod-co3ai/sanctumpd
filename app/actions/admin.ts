"use server"

import { getSupabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { createUser } from "./auth"

// Get all access requests
export async function getAllAccessRequests() {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase.from("access_requests").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching access requests:", error)
      return { success: false, message: error.message }
    }

    return { success: true, requests: data }
  } catch (error: any) {
    console.error("Unexpected error fetching access requests:", error)
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    }
  }
}

// Approve an access request
export async function approveAccessRequest(requestId: string, email: string, password: string) {
  try {
    const supabase = getSupabaseAdmin()

    // Get the request details
    const { data: requestData, error: requestError } = await supabase
      .from("access_requests")
      .select("*")
      .eq("id", requestId)
      .single()

    if (requestError) {
      console.error("Error fetching request details:", requestError)
      return { success: false, message: requestError.message }
    }

    // Check if the request is already processed
    if (requestData.status !== "Pending") {
      return {
        success: false,
        message: `This request has already been ${requestData.status.toLowerCase()}. No further action is needed.`,
      }
    }

    // Create the user
    const userResult = await createUser(email, password)

    if (!userResult.success) {
      return userResult
    }

    // Update the access request status
    const { error: updateError } = await supabase
      .from("access_requests")
      .update({
        status: "Granted",
        processed_at: new Date().toISOString(),
        processed_by: userResult.user.id, // Track who processed the request
      })
      .eq("id", requestId)

    if (updateError) {
      console.error("Error updating access request:", updateError)
      return { success: false, message: updateError.message }
    }

    // Create or update the profile with the user's information
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userResult.user.id,
      email: email,
      name: requestData.name,
      phone: requestData.phone,
      organization: requestData.organization,
      investor_type: requestData.investor_type,
      role: "standard", // Default role
    })

    if (profileError) {
      console.error("Error creating profile:", profileError)
      return { success: false, message: profileError.message }
    }

    revalidatePath("/dashboard/admin")

    return {
      success: true,
      message: "Access request approved and user created",
      user: userResult.user,
    }
  } catch (error: any) {
    console.error("Unexpected error approving access request:", error)
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    }
  }
}

// Deny an access request
export async function denyAccessRequest(requestId: string, reason = "") {
  try {
    const supabase = getSupabaseAdmin()

    // Get the request details to check its current status
    const { data: requestData, error: requestError } = await supabase
      .from("access_requests")
      .select("status")
      .eq("id", requestId)
      .single()

    if (requestError) {
      console.error("Error fetching request details:", requestError)
      return { success: false, message: requestError.message }
    }

    // Check if the request is already processed
    if (requestData.status !== "Pending") {
      return {
        success: false,
        message: `This request has already been ${requestData.status.toLowerCase()}. No further action is needed.`,
      }
    }

    // Update the access request status
    const { error } = await supabase
      .from("access_requests")
      .update({
        status: "Denied",
        denial_reason: reason,
        processed_at: new Date().toISOString(),
      })
      .eq("id", requestId)

    if (error) {
      console.error("Error denying access request:", error)
      return { success: false, message: error.message }
    }

    revalidatePath("/dashboard/admin")

    return {
      success: true,
      message: "Access request denied",
    }
  } catch (error: any) {
    console.error("Unexpected error denying access request:", error)
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    }
  }
}

// Get all users
export async function getAllUsers() {
  try {
    const supabase = getSupabaseAdmin()

    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers()

    if (usersError) {
      console.error("Error fetching users:", usersError)
      return { success: false, message: usersError.message }
    }

    // Fetch roles from profiles table
    const userIds = usersData.users.map((user) => user.id)
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, role, name")
      .in("id", userIds)

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError)
      return { success: false, message: profilesError.message }
    }

    // Combine user data with profile data
    const usersWithRoles = usersData.users.map((user) => {
      const profile = profilesData?.find((p) => p.id === user.id)
      return {
        id: user.id,
        email: user.email || "",
        name: profile?.name || null,
        role: profile?.role || "standard",
        last_sign_in: user.last_sign_in_at || "",
        created_at: user.created_at,
      }
    })

    return { success: true, users: usersWithRoles }
  } catch (error: any) {
    console.error("Unexpected error fetching users:", error)
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    }
  }
}

// Promote user to admin
export async function promoteToAdmin(userId: string) {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userId)

    if (error) {
      console.error("Error promoting user to admin:", error)
      return { success: false, message: error.message }
    }

    revalidatePath("/dashboard/admin")

    return { success: true, message: "User promoted to admin" }
  } catch (error: any) {
    console.error("Unexpected error promoting user to admin:", error)
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    }
  }
}

// Demote user to standard
export async function demoteToStandard(userId: string) {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("profiles").update({ role: "standard" }).eq("id", userId)

    if (error) {
      console.error("Error demoting user to standard:", error)
      return { success: false, message: error.message }
    }

    revalidatePath("/dashboard/admin")

    return { success: true, message: "User demoted to standard" }
  } catch (error: any) {
    console.error("Unexpected error demoting user to standard:", error)
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    }
  }
}

// Delete user
export async function deleteUser(userId: string) {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
      console.error("Error deleting user:", error)
      return { success: false, message: error.message }
    }

    revalidatePath("/dashboard/admin")

    return { success: true, message: "User deleted successfully" }
  } catch (error: any) {
    console.error("Unexpected error deleting user:", error)
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    }
  }
}
