import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  // Only run on dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return res
  }

  // Create a Supabase client
  const supabase = createMiddlewareClient({ req, res })

  // Get the session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and on a protected route, redirect to login
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
