"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { SanctumPhoneInput } from "@/components/phone-input"
import { registerUser } from "@/app/actions/auth-actions"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [organization, setOrganization] = useState("")
  const [comments, setComments] = useState("")
  const [investorType, setInvestorType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const searchParams = useSearchParams()
  const referralCode = searchParams.get("ref")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append("email", email)
    formData.append("name", name)
    formData.append("phone", phone)
    formData.append("organization", organization)
    formData.append("investorType", investorType)
    formData.append("comments", comments)
    if (referralCode) {
      formData.append("referralCode", referralCode)
    }

    const result = await registerUser(formData)

    setIsLoading(false)

    if (result.success) {
      toast({
        title: "Registration request submitted",
        description: result.message,
      })
      router.push("/login")
    } else {
      toast({
        title: "Registration failed",
        description: result.message,
        variant: "destructive",
      })
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
            <CardTitle className="text-2xl font-bold text-center text-[#503E24]">Request Investor Access</CardTitle>
            <CardDescription className="text-center text-[#503E24]/70">
              Complete the form below to request access to the Sanctum investment opportunity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#503E24]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-[#B68D53]/20 focus:border-[#B68D53] focus:ring-[#B68D53]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#503E24] flex items-center">
                  Email <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#B68D53]/20 focus:border-[#B68D53] focus:ring-[#B68D53]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#503E24]">
                  Phone
                </Label>
                <SanctumPhoneInput value={phone} onChange={setPhone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-[#503E24]">
                  Organization
                </Label>
                <Input
                  id="organization"
                  placeholder="Your organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="border-[#B68D53]/20 focus:border-[#B68D53] focus:ring-[#B68D53]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investorType" className="text-[#503E24]">
                  Investor Type
                </Label>
                <Select value={investorType} onValueChange={setInvestorType}>
                  <SelectTrigger className="border-[#B68D53]/20 focus:border-[#B68D53] focus:ring-[#B68D53]">
                    <SelectValue placeholder="Select investor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family_office">Family Office</SelectItem>
                    <SelectItem value="private_equity">Private Equity</SelectItem>
                    <SelectItem value="venture_capital">Venture Capital</SelectItem>
                    <SelectItem value="individual">Individual Investor</SelectItem>
                    <SelectItem value="corporate">Corporate Investor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments" className="text-[#503E24]">
                  Comments
                </Label>
                <textarea
                  id="comments"
                  placeholder="Any additional information you'd like to share"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-[#B68D53]/20 p-2 focus:border-[#B68D53] focus:ring-[#B68D53]"
                />
              </div>
              {referralCode && (
                <div className="mt-4 p-3 bg-[#F8F5F0] rounded-md text-sm text-[#503E24]">
                  <p>You were invited by a colleague. We'll connect your accounts once you're approved.</p>
                </div>
              )}
              <div className="text-sm text-[#503E24]/70 mt-2">
                <Link href="/access-workflow" className="text-[#B68D53] hover:underline">
                  Learn more about our access request process
                </Link>
              </div>
              <Button type="submit" className="w-full bg-[#B68D53] hover:bg-[#A67D43] text-white" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Request Access"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-[#503E24]/70 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-[#B68D53] hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
