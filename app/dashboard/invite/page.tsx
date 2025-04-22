"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Check, Copy, Mail, Share2, UserPlus } from "lucide-react"

export default function InvitePage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState(
    "I'd like to share this exciting investment opportunity with you. Check out the Sanctum Bali pitch deck!",
  )
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate invitation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${email}`,
      })
      setEmail("")
      setName("")
    }, 1500)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://sanctum-pitch.vercel.app/register?ref=invite")
    setCopied(true)
    toast({
      title: "Link copied",
      description: "Invitation link copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair">Invite Colleagues</h1>
        <p className="text-[#503E24]/80 text-lg">Share the Sanctum investment opportunity with your team</p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="email" className="space-y-4">
          <TabsList className="bg-white border-[#B68D53]/20">
            <TabsTrigger
              value="email"
              className="text-[#503E24] data-[state=active]:bg-[#B68D53] data-[state=active]:text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Invite
            </TabsTrigger>
            <TabsTrigger
              value="link"
              className="text-[#503E24] data-[state=active]:bg-[#B68D53] data-[state=active]:text-white"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card className="bg-white border-[#B68D53]/20">
              <CardHeader>
                <CardTitle className="text-[#503E24]">Invite via Email</CardTitle>
                <CardDescription className="text-[#503E24]/70">
                  Send an invitation to your colleagues to view the Sanctum investment opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInvite} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#503E24]">
                      Recipient's Name
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
                    <Label htmlFor="email" className="text-[#503E24]">
                      Recipient's Email
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
                    <Label htmlFor="message" className="text-[#503E24]">
                      Message (Optional)
                    </Label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-md border border-[#B68D53]/20 p-2"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#B68D53] text-white hover:bg-[#A67D43]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Invitation"}
                    <UserPlus className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="link">
            <Card className="bg-white border-[#B68D53]/20">
              <CardHeader>
                <CardTitle className="text-[#503E24]">Share Invitation Link</CardTitle>
                <CardDescription className="text-[#503E24]/70">
                  Copy the link below and share it with your colleagues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value="https://sanctum-pitch.vercel.app/register?ref=invite"
                    readOnly
                    className="border-[#B68D53]/20"
                  />
                  <Button
                    variant="outline"
                    className="shrink-0 text-[#503E24] border-[#503E24]/20 hover:bg-[#503E24]/10"
                    onClick={handleCopyLink}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="pt-4">
                  <h3 className="text-[#503E24] font-medium mb-2">Share with:</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-[#503E24] border-[#503E24]/20 hover:bg-[#503E24]/10">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      Twitter
                    </Button>
                    <Button variant="outline" className="text-[#503E24] border-[#503E24]/20 hover:bg-[#503E24]/10">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Facebook
                    </Button>
                    <Button variant="outline" className="text-[#503E24] border-[#503E24]/20 hover:bg-[#503E24]/10">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                          clipRule="evenodd"
                        />
                      </svg>
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
                  <span>Projected IRR of 23%, significantly exceeding industry benchmarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#B68D53] mt-0.5 flex-shrink-0" />
                  <span>Experienced team with complementary skills and industry expertise</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
