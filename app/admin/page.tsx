import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerClient } from "@/lib/supabase"

export default async function AdminDashboard() {
  const supabase = createServerClient()

  // Fetch counts for dashboard
  const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: pendingAccessRequestsCount } = await supabase
    .from("access_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: pendingInvitationsCount } = await supabase
    .from("invitations")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#503E24] font-playfair">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-[#B68D53]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#503E24] text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-[#B68D53]">{userCount || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B68D53]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#503E24] text-lg">Pending Access Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-[#B68D53]">{pendingAccessRequestsCount || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B68D53]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#503E24] text-lg">Pending Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-[#B68D53]">{pendingInvitationsCount || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white border border-[#B68D53]/20 rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#503E24] mb-4">Admin Overview</h2>
        <p className="text-[#503E24]/80">
          Welcome to the Sanctum Bali admin dashboard. From here, you can manage users, review access requests, track
          invitations, and configure system settings.
        </p>
        <ul className="mt-4 space-y-2 text-[#503E24]/80">
          <li>• Review and approve investor access requests</li>
          <li>• Manage user accounts and permissions</li>
          <li>• Track invitation status and conversions</li>
          <li>• Configure system settings and preferences</li>
        </ul>
      </div>
    </div>
  )
}
