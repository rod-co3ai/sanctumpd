"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import Link from "next/link"
import { useAdmin } from "@/contexts/admin-context"

export function AdminStatusDebug() {
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const { supabase } = useSupabase()
  const { isAdmin, loading } = useAdmin()

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          return
        }

        setUserId(session.user.id)
        setUserEmail(session.user.email)
      } catch (error) {
        console.error("Error getting user info:", error)
      }
    }

    getUserInfo()
  }, [supabase])

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50 text-xs">
      <div>
        <strong>User ID:</strong> {userId || "None"}
      </div>
      <div>
        <strong>Email:</strong> {userEmail || "None"}
      </div>
      <div>
        <strong>Admin Status:</strong> {loading ? "Checking..." : isAdmin ? "Admin" : "Not Admin"}
      </div>
      <div className="mt-2 text-xs text-blue-500 hover:underline">
        <Link href="/admin-debug">Go to Admin Debug</Link>
      </div>
    </div>
  )
}
