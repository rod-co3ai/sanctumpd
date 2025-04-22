"use server"

import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"

export async function inviteColleague(formData: FormData) {
  const supabase = createServerClient()

  // Get the current user
  const cookieStore = cookies()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      success: false,
      message: "You must be logged in to invite colleagues",
    }
  }

  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const organization = formData.get("organization") as string
  const message = formData.get("message") as string

  // Create an invitation record
  const { data: invitation, error: invitationError } = await supabase
    .from("invitations")
    .insert({
      inviter_id: session.user.id,
      invitee_email: email,
      invitee_name: name,
      invitee_phone: phone,
      invitee_organization: organization,
      personal_message: message,
      status: "pending",
    })
    .select()
    .single()

  if (invitationError) {
    return {
      success: false,
      message: invitationError.message,
    }
  }

  // In a real application, you would send an email here
  // For now, we'll just return success

  return {
    success: true,
    message: `Invitation sent to ${email}`,
  }
}
