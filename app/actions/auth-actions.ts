"use server"

import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function registerUser(formData: FormData) {
  const supabase = createServerClient()

  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const organization = formData.get("organization") as string
  const investorType = formData.get("investorType") as string
  const comments = formData.get("comments") as string
  const referralCode = formData.get("referralCode") as string

  try {
    // Create an access request
    const { data: accessRequest, error: accessRequestError } = await supabase
      .from("access_requests")
      .insert({
        email,
        full_name: name,
        phone,
        organization,
        investor_type: investorType,
        comments,
        referral_code: referralCode,
        status: "pending",
      })
      .select()
      .single()

    if (accessRequestError) {
      console.error("Error creating access request:", accessRequestError)
      return {
        success: false,
        message: accessRequestError.message,
      }
    }

    return {
      success: true,
      message: "Your access request has been submitted. Our team will review it shortly.",
    }
  } catch (error) {
    console.error("Error in registerUser:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function loginUser(formData: FormData) {
  const supabase = createServerClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error)
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      message: "Login successful",
      user: data.user,
    }
  } catch (error) {
    console.error("Error in loginUser:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createServerClient()

  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error signing out:", error)
  }

  redirect("/")
}
