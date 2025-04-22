"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { approveAccessRequest, rejectAccessRequest } from "@/app/actions/admin-actions"

export function AccessRequestsTable({ requests }: { requests: any[] }) {
  const [processingId, setProcessingId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleApprove = async (id: string, email: string) => {
    setProcessingId(id)
    try {
      const result = await approveAccessRequest(id, email)
      if (result.success) {
        toast({
          title: "Access request approved",
          description: "The user has been granted access to the platform",
        })
      } else {
        toast({
          title: "Error",
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
      setProcessingId(null)
    }
  }

  const handleReject = async (id: string) => {
    setProcessingId(id)
    try {
      const result = await rejectAccessRequest(id)
      if (result.success) {
        toast({
          title: "Access request rejected",
          description: "The user has been denied access to the platform",
        })
      } else {
        toast({
          title: "Error",
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
      setProcessingId(null)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Investor Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No access requests found
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.full_name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.organization || "-"}</TableCell>
                <TableCell>{request.investor_type || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "pending"
                        ? "outline"
                        : request.status === "approved"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  {request.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(request.id, request.email)}
                        disabled={processingId === request.id}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(request.id)}
                        disabled={processingId === request.id}
                      >
                        Reject
                      </Button>
                    </div>
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
