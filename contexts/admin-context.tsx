"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { checkUserIsAdmin } from "@/lib/api-utils"

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
    let isMounted = true

    const checkAdminStatus = async () => {
      if (!user) {
        if (isMounted) {
          setIsAdmin(false)
          setLoading(false)
        }
        return
      }

      try {
        const adminStatus = await checkUserIsAdmin(supabase, user.id)

        if (isMounted) {
          setIsAdmin(adminStatus)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error in admin context:", error)
        if (isMounted) {
          setIsAdmin(false)
          setLoading(false)
        }
      }
    }

    if (!userLoading) {
      checkAdminStatus()
    }

    return () => {
      isMounted = false
    }
  }, [user, userLoading, supabase])

  return <AdminContext.Provider value={{ isAdmin, loading }}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)
