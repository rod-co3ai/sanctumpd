import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerClient } from "@/lib/supabase"

export default async function AdminDashboardPage() {
  const supabase = createServerClient()

  // Get counts for dashboard
  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: pendingRequests } = await supabase
    .from("access_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: approvedRequests } = await supabase
    .from("access_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved")

  const { count: adminUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#503E24]">Admin Dashboard</h1>
        <p className="text-[#503E24]/70 mt-1">Manage users, access requests, and system settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#503E24]">Total Users</CardTitle>
            <CardDescription>Registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#B68D53]">{totalUsers || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#503E24]">Pending Requests</CardTitle>
            <CardDescription>Awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#B68D53]">{pendingRequests || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#503E24]">Approved Users</CardTitle>
            <CardDescription>Users with access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#B68D53]">{approvedRequests || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#503E24]">Admin Users</CardTitle>
            <CardDescription>Users with admin rights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#B68D53]">{adminUsers || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#503E24]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#503E24]/70">View and manage recent user activity and system events.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#503E24]">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#503E24]/70">Database</span>
                <span className="text-green-500 font-medium">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#503E24]/70">Authentication</span>
                <span className="text-green-500 font-medium">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#503E24]/70">Storage</span>
                <span className="text-green-500 font-medium">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
