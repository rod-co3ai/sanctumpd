import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = createServerClient()

    // First, get the user ID from the email
    const { data: userData, error: userError } = await supabase
      .from("auth.users")
      .select("id")
      .eq("email", email)
      .single()

    if (userError) {
      // Try to get the user from auth API
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers()

      if (authError) {
        return NextResponse.json({ error: `Error finding user: ${authError.message}` }, { status: 500 })
      }

      const user = authData.users.find((u) => u.email === email)

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Update the user's role in the profiles table
      const { error: updateError } = await supabase.from("profiles").update({ role: "admin" }).eq("id", user.id)

      if (updateError) {
        return NextResponse.json({ error: `Error updating user role: ${updateError.message}` }, { status: 500 })
      }

      return NextResponse.json({ success: true, userId: user.id })
    }

    // Update the user's role in the profiles table
    const { error: updateError } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userData.id)

    if (updateError) {
      return NextResponse.json({ error: `Error updating user role: ${updateError.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true, userId: userData.id })
  } catch (error) {
    console.error("Error in set-admin API:", error)
    return NextResponse.json(
      { error: `Unexpected error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    )
  }
}
