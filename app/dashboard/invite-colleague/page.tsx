"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Check, UserPlus } from "lucide-react"
import { SanctumPhoneInput } from "@/components/phone-input"

export default function InviteColleaguePage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("+1 ")
  const [organization, setOrganization] = useState("")
  const [message, setMessage] = useState(
    "I'd like to share this exciting investment opportunity with you. Check out the Sanctum Bali pitch deck!",
  )
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real application, you would save the referral relationship to a database
    // For now, we'll simulate the invitation process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${email}`,
      })
      setEmail("")
      setName("")
      setPhone("+1 ")
      setOrganization("")
    }, 1500)
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair">Invite a Colleague</h1>
        <p className="text-[#503E24]/80 text-lg">Share the Sanctum investment opportunity with your colleagues</p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-white border-[#B68D53]/20">
          <CardHeader>
            <CardTitle className="text-[#503E24]">Invite via Email</CardTitle>
            <CardDescription className="text-[#503E24]/70">
              Send an invitation to your colleague to view the Sanctum investment opportunity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#503E24]">
                  Colleague's Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-[#B68D53]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#503E24] flex items-center">
                  Colleague's Email <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#B68D53]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#503E24]">
                  Colleague's Phone
                </Label>
                <SanctumPhoneInput value={phone} onChange={setPhone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-[#503E24]">
                  Colleague's Organization
                </Label>
                <Input
                  id="organization"
                  placeholder="Their organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="border-[#B68D53]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[#503E24]">
                  Personal Message
                </Label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md border border-[#B68D53]/20 p-2"
                />
              </div>
              <Button type="submit" className="w-full bg-[#B68D53] text-white hover:bg-[#A67D43]" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Invitation"}
                <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-white border-[#B68D53]/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#503E24]">Why Share Sanctum?</h3>
              <ul className="space-y-2 text-[#503E24]/80">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#B68D53] mt-0.5 flex-shrink-0" />
                  <span>Unique investment opportunity in the rapidly growing wellness and longevity market</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#B68D53] mt-0.5 flex-shrink-0" />
                  <span>First-of-its-kind holistic wellness sanctuary in the wellness capital of the world</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#B68D53] mt-0.5 flex-shrink-0" />
                  <span>Experienced team with complementary skills and industry expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#B68D53] mt-0.5 flex-shrink-0" />
                  <span>Limited investment opportunity with significant growth potential</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
