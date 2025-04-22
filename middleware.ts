import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  const isAuthenticated = !!session

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/admin"]
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Public routes that should redirect to dashboard if already authenticated
  const publicAuthRoutes = ["/login"]
  const isPublicAuthRoute = publicAuthRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Check if this is an invitation acceptance URL
  const isInvitationUrl =
    req.nextUrl.pathname.startsWith("/auth/callback") &&
    req.nextUrl.searchParams.has("type") &&
    req.nextUrl.searchParams.get("type") === "invite"

  // Redirect authenticated users away from login pages
  if (isAuthenticated && isPublicAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Handle invitation acceptance
  if (isInvitationUrl) {
    // Let the invitation flow continue
    return res
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/auth/callback"],
}
