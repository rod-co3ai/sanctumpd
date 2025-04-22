"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function AcceptInvitationPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [inviteToken, setInviteToken] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    // Get the invite token from the URL
    const token = searchParams.get("token")
    if (token) {
      setInviteToken(token)
      // Get the email from the URL if available
      const email = searchParams.get("email")
      if (email) {
        setEmail(email)
      }
    } else {
      // No token found, redirect to home
      router.push("/")
    }
  }, [searchParams, router])

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return false
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    }
    setPasswordError("")
    return true
  }

  const handleAcceptInvitation = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePassword()) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/accept-invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          inviteToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to accept invitation")
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully. You can now log in.",
      })

      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while accepting the invitation",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F8F5F0] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-[#B68D53]/20 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-[#B68D53] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-[#503E24]">Accept Invitation</CardTitle>
            <CardDescription className="text-center text-[#503E24]/70">
              Create your account to access the Sanctum investment opportunity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAcceptInvitation} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#503E24]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!!searchParams.get("email")}
                  className="border-[#B68D53]/20 focus:border-[#B68D53] focus:ring-[#B68D53]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#503E24]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#B68D53]/20 focus:border-[#B68D53] focus:ring-[#B68D53]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#503E24]">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-[#B68D53]/20 focus:border-[#B68D53] focus:ring-[#B68D53]"
                />
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
              <Button type="submit" className="w-full bg-[#B68D53] hover:bg-[#A67D43] text-white" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
