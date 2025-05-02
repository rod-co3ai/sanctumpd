"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Import the Eye and EyeOff icons at the top of the file
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const supabase = createClientComponentClient()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          window.location.href = "/dashboard"
        }
      } catch (error) {
        console.error("Session check error:", error)
      }
    }

    checkSession()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          title: "Login failed",
          description: error.message || "Invalid email or password",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      toast({
        title: "Login successful",
        description: "Welcome to the Sanctum Investment Portal",
      })

      // Use a timeout to ensure the toast is shown before redirect
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3B4A3A] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-[#B89068]/20 bg-[#2A362A] shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 flex items-center justify-center">
                <img src="/sanctum-logo.png" alt="Sanctum" className="h-12 w-12" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Investor Portal</CardTitle>
            <CardDescription className="text-center text-[#E8E0D4]">
              Enter your credentials to access the Sanctum investment opportunity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#E8E0D4]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#B89068]/20 bg-[#3B4A3A] text-white focus:border-[#B89068] focus:ring-[#B89068]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#E8E0D4]">
                    Password
                  </Label>
                  <Link href="#" className="text-sm text-[#B89068] hover:text-[#8D6E4E]">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-[#B89068]/20 bg-[#3B4A3A] text-white focus:border-[#B89068] focus:ring-[#B89068] pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E8E0D4] hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#B89068] hover:bg-[#8D6E4E] text-white transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-[#E8E0D4] text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#B89068] hover:text-[#8D6E4E]">
                Request access
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
