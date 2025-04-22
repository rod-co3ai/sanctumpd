import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not signed in and the current path is in the dashboard, redirect to login
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = new URL("/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Check if user is trying to access admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      const redirectUrl = new URL("/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    try {
      // Fetch user role from profiles table
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

      // Redirect non-admin users
      if (!profile || profile.role !== "admin") {
        const redirectUrl = new URL("/dashboard", req.url)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error("Error in middleware:", error)
      // If there's an error, redirect to dashboard as a fallback
      const redirectUrl = new URL("/dashboard", req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
