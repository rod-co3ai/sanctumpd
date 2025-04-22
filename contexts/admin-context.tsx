"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"

type AdminContextType = {
  isAdmin: boolean
  isLoading: boolean
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isLoading: true,
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { supabase } = useSupabase()

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          const { data } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

          setIsAdmin(data?.role === "admin")
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminStatus()
  }, [supabase])

  return <AdminContext.Provider value={{ isAdmin, isLoading }}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)
