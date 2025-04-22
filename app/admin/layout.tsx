import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { isUserAdmin } from "@/lib/admin-utils"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Check if user is admin
  const isAdmin = await isUserAdmin(session.user.id)
  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      <div className="hidden md:block w-64 border-r bg-white">
        <AdminSidebar />
      </div>
      <div className="flex-1">
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  )
}
