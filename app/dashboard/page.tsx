import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Users, ArrowRight } from "lucide-react"
import { createServerClient } from "@/lib/supabase"

export default async function DashboardPage() {
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the user's profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session?.user?.id).single()

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair">
          Welcome, {profile?.full_name || "Investor"}
        </h1>
        <p className="text-[#503E24]/80 text-lg">Explore the Sanctum Bali investment opportunity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-[#B68D53]/20">
          <CardHeader>
            <CardTitle className="text-[#503E24] flex items-center">
              <FileText className="mr-2 h-5 w-5 text-[#B68D53]" />
              Investment Deck
            </CardTitle>
            <CardDescription className="text-[#503E24]/70">Review our detailed investment presentation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#503E24]/80 mb-4">
              Our comprehensive pitch deck outlines the market opportunity, business model, financial projections, and
              team behind Sanctum Bali.
            </p>
            <Link href="/dashboard/investment">
              <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white">
                View Investment Deck
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B68D53]/20">
          <CardHeader>
            <CardTitle className="text-[#503E24] flex items-center">
              <Users className="mr-2 h-5 w-5 text-[#B68D53]" />
              Invite Colleagues
            </CardTitle>
            <CardDescription className="text-[#503E24]/70">Share this opportunity with your network</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#503E24]/80 mb-4">
              Know someone who might be interested in this investment opportunity? Invite them to view our pitch deck.
            </p>
            <Link href="/dashboard/invite-colleague">
              <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white">
                Invite a Colleague
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-[#B68D53]/20">
        <CardHeader>
          <CardTitle className="text-[#503E24]">About Sanctum Bali</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#503E24]/80">
            Sanctum Bali is a luxury wellness and longevity sanctuary located in the wellness capital of the world. Our
            vision is to create a premier destination that combines cutting-edge longevity treatments, holistic wellness
            practices, and luxury accommodations in one of the most beautiful settings on earth.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8F5F0] p-4 rounded-md">
              <h3 className="font-bold text-[#503E24] mb-2">Market Opportunity</h3>
              <p className="text-sm text-[#503E24]/70">
                $1.5 trillion global wellness market with strong post-pandemic growth
              </p>
            </div>
            <div className="bg-[#F8F5F0] p-4 rounded-md">
              <h3 className="font-bold text-[#503E24] mb-2">Target Audience</h3>
              <p className="text-sm text-[#503E24]/70">
                High-net-worth individuals seeking premium wellness experiences
              </p>
            </div>
            <div className="bg-[#F8F5F0] p-4 rounded-md">
              <h3 className="font-bold text-[#503E24] mb-2">Investment Timeline</h3>
              <p className="text-sm text-[#503E24]/70">24-month development with projected opening in Q2 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
