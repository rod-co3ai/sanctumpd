"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { AccessRequestTable } from "@/components/admin/access-request-table"
import { UserManagementTable } from "@/components/admin/user-management-table"
import Link from "next/link"
import { ArrowLeft, Users, ClipboardList } from "lucide-react"

export default function AdminPage() {
  const [accessRequests, setAccessRequests] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { supabase } = useSupabase()
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch access requests
        const { data: requests, error: requestsError } = await supabase
          .from("access_requests")
          .select("*")
          .order("created_at", { ascending: false })

        if (requestsError) throw requestsError
        setAccessRequests(requests || [])

        // Fetch users
        const { data: usersData, error: usersError } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false })

        if (usersError) throw usersError
        setUsers(usersData || [])
      } catch (error: any) {
        toast({
          title: "Error loading data",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [supabase, toast])

  const handleApproveRequest = async (requestId: string) => {
    try {
      // Get the request details
      const request = accessRequests.find((r) => r.id === requestId)
      if (!request) throw new Error("Request not found")

      // Update access_requests table
      const { error: updateError } = await supabase
        .from("access_requests")
        .update({
          status: "approved",
          updated_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq("id", requestId)

      if (updateError) throw updateError

      // Send invitation email using Supabase Auth
      const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(request.email)

      if (inviteError) throw inviteError

      // Update local state
      setAccessRequests(accessRequests.map((req) => (req.id === requestId ? { ...req, status: "approved" } : req)))

      toast({
        title: "Request approved",
        description: `An invitation has been sent to ${request.email}`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    try {
      // Update access_requests table
      const { error: updateError } = await supabase
        .from("access_requests")
        .update({
          status: "rejected",
          updated_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq("id", requestId)

      if (updateError) throw updateError

      // Update local state
      setAccessRequests(accessRequests.map((req) => (req.id === requestId ? { ...req, status: "rejected" } : req)))

      toast({
        title: "Request rejected",
        description: "The access request has been rejected",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleMakeAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          role: "admin",
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (error) throw error

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: "admin" } : user)))

      toast({
        title: "Admin role granted",
        description: "The user is now an admin",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleToggleAccess = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          access_granted: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (error) throw error

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, access_granted: !currentStatus } : user)))

      toast({
        title: currentStatus ? "Access revoked" : "Access granted",
        description: `The user's access has been ${currentStatus ? "revoked" : "granted"}`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B68D53]"></div>
      </div>
    )
  }

  const pendingRequests = accessRequests.filter((request) => request.status === "pending")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#503E24]">Admin Panel</h1>
          <p className="text-[#503E24]/70 mt-1">Manage users and access requests</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>

      {pendingRequests.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <p className="text-amber-800">
              You have {pendingRequests.length} pending access {pendingRequests.length === 1 ? "request" : "requests"}{" "}
              that {pendingRequests.length === 1 ? "requires" : "require"} your attention.
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="requests">
        <TabsList className="mb-4">
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Access Requests
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests</CardTitle>
              <CardDescription>Manage user access requests to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AccessRequestTable
                requests={accessRequests}
                onApprove={handleApproveRequest}
                onReject={handleRejectRequest}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage existing users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagementTable users={users} onMakeAdmin={handleMakeAdmin} onToggleAccess={handleToggleAccess} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
