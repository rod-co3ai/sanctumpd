"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { checkUserIsAdmin } from "@/lib/api-utils"

export default function AdminDebugPage() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const { supabase } = useSupabase()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        // Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setError("Not logged in")
          return
        }

        try {
          // Get user profile
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileError) {
            setError(profileError.message)
            return
          }

          setUserData({
            id: session.user.id,
            email: session.user.email,
            profile,
          })

          // Check admin status
          const adminStatus = await checkUserIsAdmin(supabase, session.user.id)
          setIsAdmin(adminStatus)
        } catch (error: any) {
          setError(`Error: ${error.message || String(error)}`)
        }
      } catch (error: any) {
        setError(`Error: ${error.message || String(error)}`)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [supabase])

  const makeAdmin = async () => {
    if (!userData) return

    try {
      setLoading(true)

      // Add a delay to prevent rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { error } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userData.id)

      if (error) {
        setError(error.message)
        return
      }

      setIsAdmin(true)

      if (userData.profile) {
        userData.profile.role = "admin"
        setUserData({ ...userData })
      }

      setLoading(false)
    } catch (error: any) {
      setError(`Error: ${error.message || String(error)}`)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-[#F8F5F0]">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-[#503E24]">Admin Debug Page</CardTitle>
          <CardDescription>View and modify your admin status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div>Loading user data...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <>
              <div className="space-y-2">
                <div>
                  <strong>User ID:</strong> {userData.id}
                </div>
                <div>
                  <strong>Email:</strong> {userData.email}
                </div>
                <div>
                  <strong>Role:</strong> {userData.profile.role || "none"}
                </div>
                <div>
                  <strong>Access Granted:</strong> {userData.profile.access_granted ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Admin Status:</strong> {isAdmin ? "Admin" : "Not Admin"}
                </div>
              </div>

              <div className="space-y-4">
                <Button onClick={makeAdmin} className="bg-[#B68D53] hover:bg-[#A67D43] text-white" disabled={isAdmin}>
                  {isAdmin ? "Already Admin" : "Make Admin"}
                </Button>

                {isAdmin && (
                  <div className="space-y-2">
                    <div className="text-green-600 font-medium">You are an admin!</div>
                    <Link href="/admin">
                      <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white">Go to Admin Panel</Button>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="pt-4 border-t">
            <Link href="/dashboard">
              <Button variant="outline" className="text-[#503E24] border-[#503E24]/20">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
