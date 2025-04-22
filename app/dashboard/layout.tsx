"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { AdminStatusDebug } from "@/components/admin-status-debug"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-white flex items-center px-4 md:px-6">
          {isMobile && <div className="w-8" />}
          <div className="font-semibold text-[#503E24]">Sanctum Bali Investment Opportunity</div>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/dashboard/invite-colleague">
              <Button variant="outline" className="text-[#503E24] border-[#503E24]/20">
                Invite a Colleague
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto py-6 px-4 md:px-6 lg:px-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
      <AdminStatusDebug />
    </div>
  )
}
