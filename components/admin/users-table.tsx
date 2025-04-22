"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { setAdminRole } from "@/app/actions/admin-actions"

export function UsersTable({ users }: { users: any[] }) {
  const [processingId, setProcessingId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleMakeAdmin = async (id: string) => {
    setProcessingId(id)
    try {
      const result = await setAdminRole(id)
      if (result.success) {
        toast({
          title: "Role updated",
          description: "User has been granted admin privileges",
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
            <TableHead>Organization</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Access Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell>{user.organization || "-"}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role || "user"}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.access_granted ? "default" : "outline"}>
                    {user.access_granted ? "Granted" : "Denied"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  {user.role !== "admin" && (
                    <Button size="sm" onClick={() => handleMakeAdmin(user.id)} disabled={processingId === user.id}>
                      Make Admin
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
