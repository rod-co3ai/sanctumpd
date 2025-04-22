"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useSupabase } from "@/components/supabase-provider"
import { UserAccessTable } from "@/components/admin/user-access-table"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AdminPage() {
  const [accessRequests, setAccessRequests] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { supabase } = useSupabase()
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch access requests
        const { data: requests, error: requestsError } = await supabase
          .from("access_requests")
          .select(`
            id,
            user_id,
            status,
            created_at,
            updated_at,
            reviewed_by,
            review_notes,
            profiles:user_id (
              full_name,
              email,
              organization,
              investor_type
            )
          `)
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

  const handleApproveRequest = async (userId: string) => {
    try {
      // Update access_requests table
      const { error: requestError } = await supabase
        .from("access_requests")
        .update({
          status: "approved",
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)

      if (requestError) throw requestError

      // Update profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          access_granted: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (profileError) throw profileError

      // Update local state
      setAccessRequests(
        accessRequests.map((request) => (request.user_id === userId ? { ...request, status: "approved" } : request)),
      )

      setUsers(users.map((user) => (user.id === userId ? { ...user, access_granted: true } : user)))

      toast({
        title: "Access granted",
        description: "The user now has access to the platform",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleRejectRequest = async (userId: string) => {
    try {
      // Update access_requests table
      const { error: requestError } = await supabase
        .from("access_requests")
        .update({
          status: "rejected",
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)

      if (requestError) throw requestError

      // Update local state
      setAccessRequests(
        accessRequests.map((request) => (request.user_id === userId ? { ...request, status: "rejected" } : request)),
      )

      toast({
        title: "Access rejected",
        description: "The user's access request has been rejected",
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

  const handleRevokeAccess = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          access_granted: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (error) throw error

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, access_granted: false } : user)))

      toast({
        title: "Access revoked",
        description: "The user's access has been revoked",
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
    return <div className="text-center py-8">Loading...</div>
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
          <TabsTrigger value="requests">Access Requests</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests</CardTitle>
              <CardDescription>Manage user access requests to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <UserAccessTable
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
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Email</th>
                      <th className="py-3 px-4 text-left font-medium">Organization</th>
                      <th className="py-3 px-4 text-left font-medium">Role</th>
                      <th className="py-3 px-4 text-left font-medium">Access</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-muted-foreground">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 px-4">{user.full_name || "N/A"}</td>
                          <td className="py-3 px-4">{user.email || "N/A"}</td>
                          <td className="py-3 px-4">{user.organization || "N/A"}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.role || "user"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.access_granted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.access_granted ? "Granted" : "Denied"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {user.role !== "admin" && (
                                <Button size="sm" variant="outline" onClick={() => handleMakeAdmin(user.id)}>
                                  Make Admin
                                </Button>
                              )}
                              {user.access_granted ? (
                                <Button size="sm" variant="destructive" onClick={() => handleRevokeAccess(user.id)}>
                                  Revoke Access
                                </Button>
                              ) : (
                                <Button size="sm" onClick={() => handleApproveRequest(user.id)}>
                                  Grant Access
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
