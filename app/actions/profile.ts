"use server"

import { getSupabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export type ProfileData = {
  id: string
  email: string
  name: string | null
  phone: string | null
  organization: string | null
  investor_type: string | null
  comments: string | null
  referral_code: string | null
  created_at: string
  updated_at: string
}

export async function getProfile(userId: string) {
  try {
    const supabase = getSupabaseAdmin()

    // Add error handling and timeout
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching profile:", error)
      return {
        success: false,
        message: error.message || "Failed to fetch profile",
      }
    }

    if (!data) {
      console.error("No profile found for user:", userId)
      return {
        success: false,
        message: "Profile not found",
      }
    }

    return {
      success: true,
      profile: data as ProfileData,
    }
  } catch (error: any) {
    console.error("Unexpected error fetching profile:", error)
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    }
  }
}

export async function updateProfile(userId: string, profileData: Partial<ProfileData>) {
  try {
    const supabase = getSupabaseAdmin()

    // Remove id, created_at, and updated_at from the update data
    const { id, created_at, updated_at, ...updateData } = profileData as any

    const { data, error } = await supabase.from("profiles").update(updateData).eq("id", userId).select().single()

    if (error) {
      console.error("Error updating profile:", error)
      return { success: false, message: error.message }
    }

    // Revalidate the profile page
    revalidatePath("/dashboard/profile")

    return {
      success: true,
      message: "Profile updated successfully",
      profile: data as ProfileData,
    }
  } catch (error) {
    console.error("Unexpected error updating profile:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
