import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the user is not logged in and trying to access a protected route
  if (
    !session &&
    (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/admin"))
  ) {
    const redirectUrl = new URL("/login", request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is trying to access admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      // Check if user is admin
      const { data, error } = await supabase.from("profiles").select("role").eq("id", session?.user?.id).single()

      if (error || data?.role !== "admin") {
        // Redirect non-admin users to dashboard
        const redirectUrl = new URL("/dashboard", request.url)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error("Error in middleware:", error)
      const redirectUrl = new URL("/dashboard", request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
