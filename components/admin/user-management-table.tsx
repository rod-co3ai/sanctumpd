"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShieldCheck, Lock, Unlock } from "lucide-react"

interface UserManagementTableProps {
  users: any[]
  onMakeAdmin: (userId: string) => void
  onToggleAccess: (userId: string, currentStatus: boolean) => void
}

export function UserManagementTable({ users, onMakeAdmin, onToggleAccess }: UserManagementTableProps) {
  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name || "N/A"}</TableCell>
                <TableCell>{user.email || "N/A"}</TableCell>
                <TableCell>{user.organization || "N/A"}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                    className={user.role === "admin" ? "bg-purple-600" : ""}
                  >
                    {user.role || "user"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.access_granted ? "success" : "destructive"}>
                    {user.access_granted ? "Granted" : "Denied"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {user.role !== "admin" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onMakeAdmin(user.id)}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        <ShieldCheck className="h-4 w-4 mr-1" /> Make Admin
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={user.access_granted ? "destructive" : "default"}
                      onClick={() => onToggleAccess(user.id, user.access_granted)}
                      className={user.access_granted ? "" : "bg-[#B68D53] hover:bg-[#A67D43]"}
                    >
                      {user.access_granted ? (
                        <>
                          <Lock className="h-4 w-4 mr-1" /> Revoke Access
                        </>
                      ) : (
                        <>
                          <Unlock className="h-4 w-4 mr-1" /> Grant Access
                        </>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
