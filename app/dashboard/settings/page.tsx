"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { SanctumPhoneInput } from "@/components/phone-input"

export default function SettingsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [organization, setOrganization] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair">Account Settings</h1>
        <p className="text-[#503E24]/80 text-lg">Manage your profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="bg-white border-[#B68D53]/20">
            <CardHeader>
              <CardTitle className="text-[#503E24]">Profile Information</CardTitle>
              <CardDescription className="text-[#503E24]/70">
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#503E24]">
                    Full Name
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
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-[#B68D53]/20"
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
                    className="border-[#B68D53]/20"
                  />
                </div>
                <Button type="submit" className="bg-[#B68D53] hover:bg-[#A67D43] text-white mt-2" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-white border-[#B68D53]/20">
            <CardHeader>
              <CardTitle className="text-[#503E24]">Security</CardTitle>
              <CardDescription className="text-[#503E24]/70">Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full border-[#B68D53]/20 text-[#503E24]">
                Change Password
              </Button>
              <Button variant="outline" className="w-full border-[#B68D53]/20 text-[#503E24]">
                Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#B68D53]/20 mt-6">
            <CardHeader>
              <CardTitle className="text-[#503E24]">Preferences</CardTitle>
              <CardDescription className="text-[#503E24]/70">Manage your notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="text-[#503E24]">
                  Email Notifications
                </Label>
                <input
                  type="checkbox"
                  id="email-notifications"
                  className="h-4 w-4 rounded border-[#B68D53]/20 text-[#B68D53] focus:ring-[#B68D53]"
                  defaultChecked
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="investment-updates" className="text-[#503E24]">
                  Investment Updates
                </Label>
                <input
                  type="checkbox"
                  id="investment-updates"
                  className="h-4 w-4 rounded border-[#B68D53]/20 text-[#B68D53] focus:ring-[#B68D53]"
                  defaultChecked
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#B68D53] hover:bg-[#A67D43] text-white">Save Preferences</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
