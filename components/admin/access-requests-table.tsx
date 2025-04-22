"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { updateAccessRequestStatus } from "@/app/actions/admin-actions"

interface AccessRequest {
  id: string
  email: string
  full_name: string
  phone: string
  organization: string
  investor_type: string
  status: string
  created_at: string
}

interface AccessRequestsTableProps {
  accessRequests: AccessRequest[]
}

export function AccessRequestsTable({ accessRequests }: AccessRequestsTableProps) {
  const [requests, setRequests] = useState(accessRequests)
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const handleStatusUpdate = async (id: string, status: string) => {
    setIsLoading((prev) => ({ ...prev, [id]: true }))

    try {
      const result = await updateAccessRequestStatus(id, status)

      if (result.success) {
        setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status } : request)))

        toast({
          title: "Status updated",
          description: `Request ${status === "approved" ? "approved" : "rejected"} successfully`,
        })
      } else {
        toast({
          title: "Update failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, [id]: false }))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Investor Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-[#503E24]/70">
                No access requests found
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.full_name || "—"}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.organization || "—"}</TableCell>
                <TableCell>
                  {request.investor_type
                    ? request.investor_type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
                    : "—"}
                </TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>
                  {request.status === "pending" ? (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-50"
                        onClick={() => handleStatusUpdate(request.id, "approved")}
                        disabled={isLoading[request.id]}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleStatusUpdate(request.id, "rejected")}
                        disabled={isLoading[request.id]}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(request.id, "pending")}
                      disabled={isLoading[request.id]}
                    >
                      Reset
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
