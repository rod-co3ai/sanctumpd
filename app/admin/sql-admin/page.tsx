"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useSupabase } from "@/components/supabase-provider"

export default function SqlAdminPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { supabase } = useSupabase()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // First, get the user ID from the email
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single()

      if (userError) {
        throw new Error("User not found with that email")
      }

      // Update the user's role to admin
      const { error: updateError } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userData.id)

      if (updateError) {
        throw new Error("Failed to update user role")
      }

      toast({
        title: "Success",
        description: `User ${email} has been granted admin privileges`,
      })
      setEmail("")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#503E24]">SQL Admin Access</h1>
        <p className="text-[#503E24]/70 mt-1">Directly set admin privileges via SQL</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-[#503E24]">Set Admin User</CardTitle>
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
              {isLoading ? "Processing..." : "Set as Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
