import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerClient } from "@/lib/supabase"
import { AccessRequestsTable } from "@/components/admin/access-requests-table"

export default async function AccessRequestsPage() {
  const supabase = createServerClient()

  // Fetch access requests
  const { data: accessRequests } = await supabase
    .from("access_requests")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#503E24] font-playfair">Access Requests</h1>

      <Card className="bg-white border-[#B68D53]/20">
        <CardHeader>
          <CardTitle className="text-[#503E24]">Manage Access Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <AccessRequestsTable accessRequests={accessRequests || []} />
        </CardContent>
      </Card>
    </div>
  )
}
