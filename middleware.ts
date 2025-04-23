import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  // Break redirect loops - if there's a loop parameter, just continue
  if (req.nextUrl.searchParams.has("noredirect")) {
    return res
  }

  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Only protect dashboard routes - don't redirect from login to dashboard automatically
    if (pathname.startsWith("/dashboard") && !session) {
      console.log("No session found, redirecting to login")
      const redirectUrl = new URL("/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (e) {
    console.error("Middleware error:", e)
    // If there's an error, allow the request to continue
    return res
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
