import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F5F0]">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-[#B68D53] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="ml-2 text-xl font-bold text-[#503E24]">Sanctum Bali</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-[#503E24]">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white">Request Access</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#503E24] font-playfair max-w-4xl">
          A Luxury Wellness & Longevity Sanctuary in Bali
        </h1>
        <p className="mt-6 text-xl text-[#503E24]/80 max-w-2xl">
          Exclusive investment opportunity in the rapidly growing wellness and longevity market
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/register">
            <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white px-8 py-6 text-lg">
              Request Investor Access
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-[#B68D53] text-[#B68D53] px-8 py-6 text-lg">
              Investor Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border border-[#B68D53]/10">
            <div className="h-12 w-12 bg-[#B68D53]/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-[#B68D53] font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold text-[#503E24] mb-3">Prime Location</h3>
            <p className="text-[#503E24]/70">
              Located in Bali, the wellness capital of the world, with unparalleled natural beauty and established
              wellness tourism.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border border-[#B68D53]/10">
            <div className="h-12 w-12 bg-[#B68D53]/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-[#B68D53] font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold text-[#503E24] mb-3">Experienced Team</h3>
            <p className="text-[#503E24]/70">
              Led by industry experts with proven track records in wellness, hospitality, and real estate development.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border border-[#B68D53]/10">
            <div className="h-12 w-12 bg-[#B68D53]/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-[#B68D53] font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold text-[#503E24] mb-3">Growth Market</h3>
            <p className="text-[#503E24]/70">
              Targeting the rapidly expanding $1.5 trillion wellness market with strong post-pandemic growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair mb-6">
          Limited Investment Opportunity
        </h2>
        <p className="text-xl text-[#503E24]/80 max-w-2xl mx-auto mb-10">
          Join us in creating the premier wellness and longevity sanctuary in Bali. Request access to view our detailed
          investment deck.
        </p>
        <Link href="/register">
          <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white px-8 py-6 text-lg">
            Request Investor Access
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#B68D53]/10 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 bg-[#B68D53] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="ml-2 text-lg font-bold text-[#503E24]">Sanctum Bali</span>
            </div>
            <div className="text-[#503E24]/60 text-sm">
              &copy; {new Date().getFullYear()} Sanctum Bali. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
