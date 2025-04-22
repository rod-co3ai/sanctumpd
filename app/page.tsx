import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F5F0]">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-[#B68D53] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-[#503E24] font-bold text-xl">SANCTUM</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline" className="text-[#503E24] border-[#503E24] hover:bg-[#503E24]/10">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#B68D53] text-white hover:bg-[#A67D43]">Register</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#503E24] leading-tight font-playfair">
              WHERE LIFESTYLE <br />
              <span className="text-[#B68D53]">MEETS LONGEVITY</span>
            </h1>
            <p className="text-[#503E24]/80 text-lg max-w-xl">
              Sanctum is a unique investment opportunity in Bali's luxury wellness market, offering a 36-suite sanctuary
              dedicated to personalized well-being and longevity in the heart of Bali.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/login">
                <Button className="bg-[#B68D53] text-white hover:bg-[#A67D43] px-6 py-6">
                  Explore Investment Opportunity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="text-[#503E24] border-[#503E24] hover:bg-[#503E24]/10 px-6 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/balinese-river-retreat.png"
              alt="Sanctum Bali"
              fill
              className="object-cover rounded-xl"
              priority
            />
            <div className="absolute bottom-4 right-4 h-12 w-12 bg-[#B68D53] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-[#503E24] text-xl font-semibold mb-2">Luxury Wellness</h3>
            <p className="text-[#503E24]/70">
              Experience unparalleled luxury in our state-of-the-art wellness sanctuary designed for holistic
              rejuvenation.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-[#503E24] text-xl font-semibold mb-2">Longevity Focus</h3>
            <p className="text-[#503E24]/70">
              Our innovative approach combines ancient wisdom with cutting-edge science to enhance health and extend
              vitality.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-[#503E24] text-xl font-semibold mb-2">Prime Location</h3>
            <p className="text-[#503E24]/70">
              Situated in a breathtaking riverfront setting in Bali, offering the perfect blend of serenity and
              accessibility.
            </p>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6 border-t border-[#503E24]/10">
        <div className="flex justify-between items-center">
          <p className="text-[#503E24]/60 text-sm">&copy; {new Date().getFullYear()} Sanctum. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-[#503E24]/60 hover:text-[#503E24] text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#503E24]/60 hover:text-[#503E24] text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
