import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      <DashboardNav />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  )
}
