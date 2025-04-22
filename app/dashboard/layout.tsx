"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { motion } from "framer-motion"
import { DashboardNav } from "@/components/dashboard-nav"
import { useSupabase } from "@/components/supabase-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { user, isLoading } = useSupabase()

  useEffect(() => {
    setMounted(true)

    // If not loading and no user, redirect to login
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (!mounted || isLoading) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-white flex items-center px-4 md:px-6">
          <div className="font-semibold text-[#503E24]">Sanctum Bali Investment Opportunity</div>
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
    </div>
  )
}
