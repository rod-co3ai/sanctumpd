import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { isUserAdmin } from "@/lib/admin-utils"

export async function POST(request: Request) {
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
  }

  // Check if user is admin
  const isAdmin = await isUserAdmin(session.user.id)
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Not authorized" }, { status: 403 })
  }

  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Get the user ID from the email
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single()

    if (userError) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Update the user's role to admin
    const { error: updateError } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userData.id)

    if (updateError) {
      return NextResponse.json({ success: false, message: "Failed to update user role" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "User role updated to admin successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
