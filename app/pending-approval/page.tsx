"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { motion } from "framer-motion"

export default function PendingApprovalPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [requestStatus, setRequestStatus] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { supabase, user, signOut } = useSupabase()

  useEffect(() => {
    const checkAccessStatus = async () => {
      if (!user) {
        router.push("/login")
        return
      }

      try {
        // Check if user has access granted
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("access_granted")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError

        // If access is granted, redirect to dashboard
        if (profile?.access_granted) {
          router.push("/dashboard")
          return
        }

        // Check access request status
        const { data: request, error: requestError } = await supabase
          .from("access_requests")
          .select("status")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (requestError && requestError.code !== "PGRST116") throw requestError

        setRequestStatus(request?.status || "pending")
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "An error occurred while checking your access status",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkAccessStatus()
  }, [user, router, supabase, toast])

  const handleSignOut = async () => {
    await signOut()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F8F5F0]">
        <p className="text-[#503E24]">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F8F5F0] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-[#B68D53]/20 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-[#B68D53] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-[#503E24]">Access Pending</CardTitle>
            <CardDescription className="text-center text-[#503E24]/70">
              Your request to access the Sanctum investment opportunity is being reviewed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-[#F8F5F0] p-4 rounded-lg">
                <p className="text-[#503E24] font-medium">
                  Status: <span className="capitalize">{requestStatus}</span>
                </p>
              </div>

              {requestStatus === "pending" && (
                <p className="text-[#503E24]">
                  Thank you for your interest in Sanctum Bali. Our team is currently reviewing your access request. You
                  will be notified via email once your request has been approved.
                </p>
              )}

              {requestStatus === "rejected" && (
                <p className="text-[#503E24]">
                  We regret to inform you that your access request has been declined at this time. If you believe this
                  is an error, please contact our investor relations team.
                </p>
              )}

              <Button onClick={handleSignOut} variant="outline" className="mt-4">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
