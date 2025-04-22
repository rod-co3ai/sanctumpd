import { getAccessRequests } from "@/lib/admin-utils"
import { AccessRequestsTable } from "@/components/admin/access-requests-table"

export default async function AccessRequestsPage() {
  const requests = await getAccessRequests()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#503E24]">Access Requests</h1>
        <p className="text-[#503E24]/70 mt-1">Manage user access requests to the platform</p>
      </div>

      <AccessRequestsTable requests={requests} />
    </div>
  )
}
