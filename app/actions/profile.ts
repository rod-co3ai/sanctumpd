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
  role?: string
}

export async function getProfile(userId: string) {
  try {
    console.log("Getting profile for user:", userId)
    const supabase = getSupabaseAdmin()

    // First, check if profile exists
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching profile:", error)

      // If the error is that the profile doesn't exist, create one
      if (error.code === "PGRST116") {
        console.log("Profile not found, creating new profile")
        // Get user data from auth
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId)

        if (userError) {
          console.error("Error fetching user:", userError)
          return {
            success: false,
            message: "Failed to fetch user data",
          }
        }

        // Create a new profile
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            email: userData.user?.email || "",
            name: userData.user?.user_metadata?.full_name || userData.user?.user_metadata?.name || "",
            role: "standard", // Default role
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (createError) {
          console.error("Error creating profile:", createError)
          return {
            success: false,
            message: "Failed to create profile",
          }
        }

        return {
          success: true,
          profile: newProfile as ProfileData,
        }
      }

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

    console.log("Profile found:", data)
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

    // Remove id, created_at, updated_at, and role from the update data
    const { id, created_at, updated_at, role, ...updateData } = profileData as any

    // Add updated_at timestamp
    updateData.updated_at = new Date().toISOString()

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
