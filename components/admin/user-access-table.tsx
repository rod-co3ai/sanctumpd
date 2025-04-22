"use client"

import { Button } from "@/components/ui/button"

interface UserAccessTableProps {
  requests: any[]
  onApprove: (userId: string) => void
  onReject: (userId: string) => void
}

export function UserAccessTable({ requests, onApprove, onReject }: UserAccessTableProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Name</th>
            <th className="py-3 px-4 text-left font-medium">Email</th>
            <th className="py-3 px-4 text-left font-medium">Organization</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Date</th>
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 text-center text-muted-foreground">
                No access requests found
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="py-3 px-4">{request.profiles?.full_name || "N/A"}</td>
                <td className="py-3 px-4">{request.profiles?.email || "N/A"}</td>
                <td className="py-3 px-4">{request.profiles?.organization || "N/A"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="py-3 px-4">{new Date(request.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => onApprove(request.user_id)}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onReject(request.user_id)}>
                        Reject
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
