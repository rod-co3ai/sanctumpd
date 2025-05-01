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
import { submitAccessRequest } from "../actions/register"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("+1 ")
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

    try {
      // Submit the form data to our server action
      const result = await submitAccessRequest({
        name,
        email,
        phone,
        organization,
        investorType,
        comments,
        referralCode,
      })

      if (result.success) {
        toast({
          title: "Registration request submitted",
          description: result.message,
        })
        // Redirect to login page after successful submission
        router.push("/login")
      } else {
        toast({
          title: "Error submitting request",
          description: result.message,
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sanctum-green p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-sanctum-gold/20 shadow-lg bg-sanctum-darkgreen">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 flex items-center justify-center">
                <img src="/sanctum-logo.png" alt="Sanctum" className="h-12 w-12" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Request Investor Access</CardTitle>
            <CardDescription className="text-center text-white/70">
              Complete the form below to request access to the Sanctum investment opportunity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-sanctum-gold/20 bg-sanctum-green/50 text-white focus:border-sanctum-gold focus:ring-sanctum-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white flex items-center">
                  Email <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-sanctum-gold/20 bg-sanctum-green/50 text-white focus:border-sanctum-gold focus:ring-sanctum-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone
                </Label>
                <SanctumPhoneInput value={phone} onChange={setPhone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-white">
                  Organization
                </Label>
                <Input
                  id="organization"
                  placeholder="Your organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="border-sanctum-gold/20 bg-sanctum-green/50 text-white focus:border-sanctum-gold focus:ring-sanctum-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investorType" className="text-white">
                  Investor Type
                </Label>
                <Select value={investorType} onValueChange={setInvestorType}>
                  <SelectTrigger className="border-sanctum-gold/20 bg-sanctum-green/50 text-white focus:border-sanctum-gold focus:ring-sanctum-gold">
                    <SelectValue placeholder="Select investor type" />
                  </SelectTrigger>
                  <SelectContent className="bg-sanctum-darkgreen text-white border-sanctum-gold/20">
                    <SelectItem value="family_office" className="focus:bg-sanctum-gold/20 focus:text-white">
                      Family Office
                    </SelectItem>
                    <SelectItem value="private_equity" className="focus:bg-sanctum-gold/20 focus:text-white">
                      Private Equity
                    </SelectItem>
                    <SelectItem value="venture_capital" className="focus:bg-sanctum-gold/20 focus:text-white">
                      Venture Capital
                    </SelectItem>
                    <SelectItem value="individual" className="focus:bg-sanctum-gold/20 focus:text-white">
                      Individual Investor
                    </SelectItem>
                    <SelectItem value="corporate" className="focus:bg-sanctum-gold/20 focus:text-white">
                      Corporate Investor
                    </SelectItem>
                    <SelectItem value="other" className="focus:bg-sanctum-gold/20 focus:text-white">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments" className="text-white">
                  Comments
                </Label>
                <textarea
                  id="comments"
                  placeholder="Any additional information you'd like to share"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-sanctum-gold/20 bg-sanctum-green/50 p-2 text-white focus:border-sanctum-gold focus:ring-sanctum-gold"
                />
              </div>
              {referralCode && (
                <div className="mt-4 p-3 bg-sanctum-green rounded-md text-sm text-white">
                  <p>You were invited by a colleague. We'll connect your accounts once you're approved.</p>
                </div>
              )}
              <div className="text-sm text-white/70 mt-2">
                <Link href="/access-workflow" className="text-sanctum-gold hover:underline">
                  Learn more about our access request process
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-sanctum-gold hover:bg-sanctum-gold/80 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Request Access"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-white/70 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-sanctum-gold hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
