import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key for admin operations
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const { name, email, organization, phone, investorType, comments } = await request.json()

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if an access request with this email already exists
    const { data: existingRequests, error: checkError } = await supabaseAdmin
      .from("access_requests")
      .select("id, email")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing requests:", checkError)
      return NextResponse.json({ error: "Error checking existing requests" }, { status: 500 })
    }

    if (existingRequests) {
      return NextResponse.json({ error: "An access request with this email already exists" }, { status: 400 })
    }

    // Insert the access request
    const { data, error } = await supabaseAdmin
      .from("access_requests")
      .insert({
        full_name: name,
        email,
        organization,
        phone,
        investor_type: investorType,
        comments,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error creating access request:", error)
      return NextResponse.json({ error: "Error creating access request" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Access request submitted successfully",
      requestId: data[0].id,
    })
  } catch (error: any) {
    console.error("Error in request-access API:", error)
    return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 })
  }
}
