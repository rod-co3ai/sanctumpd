import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient(
    { req, res },
    {
      cookies: {
        // Make cookies more resilient across environments
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
  )

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error("Session error in middleware:", error.message)
  }

  // Protected routes
  if (pathname.startsWith("/dashboard") && !session) {
    console.log("No session found, redirecting to login")
    const redirectUrl = new URL("/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is signed in and the current path is /login or /register, redirect to /dashboard
  if ((pathname === "/login" || pathname === "/register") && session) {
    console.log("Session found, redirecting to dashboard")
    const redirectUrl = new URL("/dashboard", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
