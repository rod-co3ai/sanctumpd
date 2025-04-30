"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Loader2, CheckCircle, XCircle, UserCog, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  getAllAccessRequests,
  approveAccessRequest,
  denyAccessRequest,
  getAllUsers,
  promoteToAdmin,
  demoteToStandard,
  deleteUser,
} from "@/app/actions/admin"
import { Textarea } from "@/components/ui/textarea"

type AccessRequest = {
  id: string
  name: string
  email: string
  phone: string
  organization: string
  investor_type: string
  status: string
  created_at: string
  processed_at?: string
  denial_reason?: string
}

type UserProfile = {
  id: string
  email: string
  name: string
  role: string
  last_sign_in: string
  created_at: string
}

export default function AdminPage() {
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isLoadingRequests, setIsLoadingRequests] = useState(true)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null)
  const [password, setPassword] = useState("")
  const [denialReason, setDenialReason] = useState("")
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isDenyDialogOpen, setIsDenyDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [deleteConfirmEmail, setDeleteConfirmEmail] = useState("")
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchAccessRequests()
    fetchUsers()
  }, [])

  const fetchAccessRequests = async () => {
    setIsLoadingRequests(true)
    try {
      const result = await getAllAccessRequests()
      if (result.success) {
        setAccessRequests(result.requests)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching access requests:", error)
      toast({
        title: "Error",
        description: "Failed to load access requests",
        variant: "destructive",
      })
    } finally {
      setIsLoadingRequests(false)
    }
  }

  const fetchUsers = async () => {
    setIsLoadingUsers(true)
    try {
      const result = await getAllUsers()
      if (result.success) {
        setUsers(result.users)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedRequest) return

    setIsProcessing(true)
    try {
      const result = await approveAccessRequest(selectedRequest.id, selectedRequest.email, password)
      if (result.success) {
        toast({
          title: "Success",
          description: "Access request approved and user created",
        })
        fetchAccessRequests()
        fetchUsers()
        setIsApproveDialogOpen(false)
        setPassword("")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error approving request:", error)
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeny = async () => {
    if (!selectedRequest) return

    setIsProcessing(true)
    try {
      const result = await denyAccessRequest(selectedRequest.id, denialReason)
      if (result.success) {
        toast({
          title: "Success",
          description: "Access request denied",
        })
        fetchAccessRequests()
        setIsDenyDialogOpen(false)
        setDenialReason("")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error denying request:", error)
      toast({
        title: "Error",
        description: "Failed to deny request",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      let result
      if (newRole === "admin") {
        result = await promoteToAdmin(userId)
      } else {
        result = await demoteToStandard(userId)
      }

      if (result.success) {
        toast({
          title: "Success",
          description: `User role updated to ${newRole}`,
        })
        fetchUsers()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error changing user role:", error)
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return
    if (deleteConfirmEmail !== userToDelete.email) {
      toast({
        title: "Error",
        description: "Email confirmation doesn't match",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)
      const result = await deleteUser(userToDelete.id)
      setIsProcessing(false)

      if (result.success) {
        toast({
          title: "Success",
          description: "User deleted successfully",
        })
        fetchUsers()
        setIsDeleteDialogOpen(false)
        setDeleteConfirmEmail("")
        setUserToDelete(null)
      } else {
        toast({
          title: "Error deleting user",
          description: result.message || "Failed to delete user",
          variant: "destructive",
        })
      }
    } catch (error) {
      setIsProcessing(false)
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting the user",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pending":
        return "outline"
      case "Granted":
        return "default"
      case "Denied":
        return "destructive"
      default:
        return "outline"
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair">Admin Panel</h1>
        <p className="text-[#503E24]/80 text-lg">Manage access requests and user accounts</p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="requests">Access Requests</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card className="border-[#B68D53]/20">
              <CardHeader>
                <CardTitle className="text-[#503E24]">Access Requests</CardTitle>
                <CardDescription className="text-[#503E24]/70">
                  Review and manage pending access requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingRequests ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#B68D53]" />
                  </div>
                ) : accessRequests.length === 0 ? (
                  <div className="text-center py-8 text-[#503E24]/70">No access requests found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Organization</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {accessRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.name || "-"}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.organization || "-"}</TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusBadgeVariant(request.status)}
                                className={request.status === "Granted" ? "bg-[#B68D53]" : ""}
                              >
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {request.status === "Pending" ? (
                                <div className="flex space-x-2">
                                  <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-green-600 border-green-600 hover:bg-green-50"
                                        onClick={() => {
                                          setSelectedRequest(request)
                                          setIsApproveDialogOpen(true)
                                        }}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Approve
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Approve Access Request</DialogTitle>
                                        <DialogDescription>
                                          Create an account for {selectedRequest?.name || "this user"} (
                                          {selectedRequest?.email})
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="password">Set Password</Label>
                                          <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter a secure password"
                                          />
                                          <p className="text-xs text-[#503E24]/70">
                                            This password will be set for the new user account. The user can change it
                                            later.
                                          </p>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={handleApprove}
                                          disabled={!password || isProcessing}
                                          className="bg-[#B68D53] hover:bg-[#A67D43] text-white"
                                        >
                                          {isProcessing ? (
                                            <>
                                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                              Processing...
                                            </>
                                          ) : (
                                            "Create Account"
                                          )}
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>

                                  <Dialog open={isDenyDialogOpen} onOpenChange={setIsDenyDialogOpen}>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                        onClick={() => {
                                          setSelectedRequest(request)
                                          setIsDenyDialogOpen(true)
                                        }}
                                      >
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Deny
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Deny Access Request</DialogTitle>
                                        <DialogDescription>
                                          This will deny the access request from {selectedRequest?.name || "this user"}{" "}
                                          ({selectedRequest?.email})
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="denial-reason">Reason (Optional)</Label>
                                          <Textarea
                                            id="denial-reason"
                                            value={denialReason}
                                            onChange={(e) => setDenialReason(e.target.value)}
                                            placeholder="Enter a reason for denying this request"
                                            rows={3}
                                          />
                                          <p className="text-xs text-[#503E24]/70">
                                            This reason will be recorded for internal reference.
                                          </p>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsDenyDialogOpen(false)}>
                                          Cancel
                                        </Button>
                                        <Button onClick={handleDeny} disabled={isProcessing} variant="destructive">
                                          {isProcessing ? (
                                            <>
                                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                              Processing...
                                            </>
                                          ) : (
                                            "Deny Request"
                                          )}
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              ) : (
                                <div className="text-sm text-[#503E24]/70">
                                  {request.status === "Granted" ? "Approved" : "Denied"} on{" "}
                                  {request.processed_at ? new Date(request.processed_at).toLocaleDateString() : "N/A"}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-[#B68D53]/20">
              <CardHeader>
                <CardTitle className="text-[#503E24]">User Management</CardTitle>
                <CardDescription className="text-[#503E24]/70">Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingUsers ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#B68D53]" />
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8 text-[#503E24]/70">No users found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Last Sign In</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name || "-"}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge
                                variant={user.role === "admin" ? "default" : "outline"}
                                className={user.role === "admin" ? "bg-[#B68D53]" : ""}
                              >
                                {user.role === "admin" ? "Admin" : "Standard"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {user.last_sign_in ? new Date(user.last_sign_in).toLocaleString() : "Never"}
                            </TableCell>
                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleRoleChange(user.id, user.role === "admin" ? "standard" : "admin")
                                  }
                                >
                                  <UserCog className="h-4 w-4 mr-1" />
                                  {user.role === "admin" ? "Make Standard" : "Make Admin"}
                                </Button>

                                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600 border-red-600 hover:bg-red-50"
                                      onClick={() => setUserToDelete(user)}
                                    >
                                      <Trash2 className="h-4 w-4 mr-1" />
                                      Delete
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Delete User</DialogTitle>
                                      <DialogDescription>
                                        This action cannot be undone. The user will be permanently deleted.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="confirm-email">
                                          Type <span className="font-semibold">{userToDelete?.email}</span> to confirm
                                        </Label>
                                        <Input
                                          id="confirm-email"
                                          value={deleteConfirmEmail}
                                          onChange={(e) => setDeleteConfirmEmail(e.target.value)}
                                          placeholder="Enter email to confirm"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        variant="outline"
                                        onClick={() => {
                                          setIsDeleteDialogOpen(false)
                                          setDeleteConfirmEmail("")
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={handleDeleteUser}
                                        disabled={deleteConfirmEmail !== userToDelete?.email || isProcessing}
                                        variant="destructive"
                                      >
                                        {isProcessing ? (
                                          <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Deleting...
                                          </>
                                        ) : (
                                          "Delete User"
                                        )}
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
