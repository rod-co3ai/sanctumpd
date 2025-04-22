"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createAdminUser } from "@/app/actions/create-admin-user"

export default function CreateAdminPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append("email", email)

    try {
      const result = await createAdminUser(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        setEmail("")
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
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#503E24]">Create Admin User</h1>
        <p className="text-[#503E24]/70 mt-1">Grant admin privileges to an existing user</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-[#503E24]">Add Admin User</CardTitle>
          <CardDescription>Enter the email of an existing user to grant them admin privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#503E24]">
                User Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#B68D53]/20"
              />
            </div>
            <Button type="submit" className="w-full bg-[#B68D53] hover:bg-[#A67D43] text-white" disabled={isLoading}>
              {isLoading ? "Processing..." : "Grant Admin Access"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
