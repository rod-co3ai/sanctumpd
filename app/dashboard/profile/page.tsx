"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { SanctumPhoneInput } from "@/components/phone-input"
import { getProfile, updateProfile, type ProfileData } from "@/app/actions/profile"
import { Loader2, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isAdmin } = useAuth()
  const { toast } = useToast()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+1 ",
    organization: "",
    investor_type: "",
    comments: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        const result = await getProfile(user.id)

        if (result.success && result.profile) {
          // Use user.user_metadata.full_name or user display name if available
          const displayName =
            user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || ""

          setProfile(result.profile)
          setFormData({
            // Use display name from auth if profile name is empty
            name: result.profile.name || displayName,
            email: result.profile.email || user.email || "",
            phone: result.profile.phone || "+1 ",
            organization: result.profile.organization || "",
            investor_type: result.profile.investor_type || "",
            comments: result.profile.comments || "",
          })
        } else {
          console.error("Failed to load profile:", result.message)
          toast({
            title: "Error loading profile",
            description: result.message || "Failed to load profile information",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error in profile fetch:", error)
        toast({
          title: "Error loading profile",
          description: "An unexpected error occurred while loading your profile",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    const result = await updateProfile(user.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      investor_type: formData.investor_type,
      comments: formData.comments,
    })
    setIsSaving(false)

    if (result.success) {
      setProfile(result.profile)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    } else {
      toast({
        title: "Error updating profile",
        description: result.message || "Failed to update profile",
        variant: "destructive",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#B68D53]" />
        <p className="text-[#503E24]">Loading your profile...</p>
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair">Your Profile</h1>
          {isAdmin && (
            <Link href="/dashboard/admin">
              <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Admin Panel
              </Button>
            </Link>
          )}
        </div>
        <p className="text-[#503E24]/80 text-lg">View and update your profile information</p>
      </motion.div>

      {isAdmin && (
        <motion.div variants={item}>
          <Card className="border-[#B68D53]/20 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-[#B68D53]" />
                <div>
                  <h3 className="font-medium text-[#503E24]">Administrator Account</h3>
                  <p className="text-sm text-[#503E24]/70">
                    You have administrator privileges. Access the admin panel to manage users and access requests.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div variants={item}>
        <Card className="border-[#B68D53]/20">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-[#503E24]">Personal Information</CardTitle>
              <CardDescription className="text-[#503E24]/70">
                Update your personal details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#503E24]">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-[#B68D53]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#503E24]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-[#B68D53]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#503E24]">
                    Phone
                  </Label>
                  <SanctumPhoneInput
                    value={formData.phone}
                    onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-[#503E24]">
                    Organization
                  </Label>
                  <Input
                    id="organization"
                    name="organization"
                    placeholder="Your organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="border-[#B68D53]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investor_type" className="text-[#503E24]">
                  Investor Type
                </Label>
                <Select
                  value={formData.investor_type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, investor_type: value }))}
                >
                  <SelectTrigger className="border-[#B68D53]/20">
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
                  Additional Information
                </Label>
                <textarea
                  id="comments"
                  name="comments"
                  placeholder="Any additional information you'd like to share"
                  value={formData.comments || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md border border-[#B68D53]/20 p-2"
                />
              </div>

              {profile?.created_at && (
                <div className="text-sm text-[#503E24]/60">
                  Account created: {new Date(profile.created_at).toLocaleDateString()}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                className="border-[#B68D53]/20 text-[#503E24]"
                onClick={() => {
                  if (profile) {
                    setFormData({
                      name: profile.name || "",
                      email: profile.email || "",
                      phone: profile.phone || "+1 ",
                      organization: profile.organization || "",
                      investor_type: profile.investor_type || "",
                      comments: profile.comments || "",
                    })
                  }
                }}
              >
                Reset
              </Button>
              <Button type="submit" className="bg-[#B68D53] hover:bg-[#A67D43] text-white" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  )
}
