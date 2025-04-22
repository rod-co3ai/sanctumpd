import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Test the connection by getting the current user
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      message: "Supabase connection successful",
      user: data.user,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
