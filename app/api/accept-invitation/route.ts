import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key for admin operations
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const { email, password, inviteToken } = await request.json()

    // Validate required fields
    if (!email || !password || !inviteToken) {
      return NextResponse.json({ error: "Email, password, and invite token are required" }, { status: 400 })
    }

    // Use the invite token to create the user account
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(inviteToken, {
      email,
      password,
      email_confirm: true,
    })

    if (error) throw error

    // Update the user's profile with access_granted = true
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        access_granted: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.user.id)

    if (profileError) throw profileError

    return NextResponse.json({
      success: true,
      message: "Invitation accepted successfully",
    })
  } catch (error: any) {
    console.error("Error in accept-invitation API:", error)
    return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 })
  }
}
