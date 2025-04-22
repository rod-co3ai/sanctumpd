"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"

type AdminContextType = {
  isAdmin: boolean
  loading: boolean
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  loading: true,
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const { supabase, user, loading: userLoading } = useSupabase()

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

        if (error) {
          console.error("Error checking admin status:", error)
          setIsAdmin(false)
        } else {
          setIsAdmin(data?.role === "admin")
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    if (!userLoading) {
      checkAdminStatus()
    }
  }, [user, userLoading, supabase])

  return <AdminContext.Provider value={{ isAdmin, loading }}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)
