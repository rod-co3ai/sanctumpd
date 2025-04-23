"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export type RegisterFormData = {
  name: string
  email: string
  phone: string
  organization: string
  investorType: string
  comments: string
  referralCode?: string | null
}

export async function submitAccessRequest(formData: RegisterFormData) {
  try {
    // Insert the data into the access_requests table
    const { data, error } = await supabase
      .from("access_requests")
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        investor_type: formData.investorType,
        comments: formData.comments,
        referral_code: formData.referralCode || null,
        status: "Pending", // Default status
      })
      .select()

    if (error) {
      console.error("Error submitting access request:", error)
      return { success: false, message: error.message }
    }

    // Revalidate the path to update any data
    revalidatePath("/register")

    return {
      success: true,
      message: "Your access request has been submitted successfully. We will review it shortly.",
      data,
    }
  } catch (error) {
    console.error("Unexpected error submitting access request:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
