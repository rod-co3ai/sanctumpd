import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3B4A3A] to-[#2A362A]">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-0.5">
          <div className="h-16 w-16 flex items-center justify-center">
            <img src="/sanctum-logo.png" alt="Sanctum Logo" className="h-16 w-16" />
          </div>
          <div className="h-32 flex items-center">
            <img src="/sanctum-word-gold.png" alt="SANCTUM" className="h-32" />
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-4 py-2 rounded border border-[#B89068] text-[#B89068] bg-transparent hover:bg-[#B89068]/10 transition-colors">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 rounded bg-[#B89068] text-white hover:bg-[#8D6E4E] transition-colors">
              Register
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight font-playfair">
              WHERE LIFESTYLE <br />
              <span className="text-[#B89068]">MEETS LONGEVITY</span>
            </h1>
            <p className="text-[#E8E0D4] text-lg max-w-xl">
              Sanctum is a unique investment opportunity in Bali's luxury wellness market, offering a 36-suite sanctuary
              dedicated to personalized well-being and longevity in the heart of Bali.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/login">
                <button className="flex items-center px-6 py-3 rounded bg-[#B89068] text-white hover:bg-[#8D6E4E] transition-colors">
                  Explore Investment Opportunity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
              <Link href="/register">
                <button className="px-6 py-3 rounded border border-[#B89068] text-[#B89068] bg-transparent hover:bg-[#B89068]/10 transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/sanctum-bali-resort.jpeg"
              alt="Sanctum Bali Resort"
              fill
              className="object-cover rounded-xl"
              priority
            />
            <div className="absolute bottom-4 right-4 h-12 w-12 flex items-center justify-center">
              <img src="/sanctum-logo.png" alt="Sanctum" className="h-12 w-12" />
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#4C5A4B] p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-white text-xl font-semibold mb-2">Luxury Wellness</h3>
            <p className="text-[#E8E0D4]">
              Experience unparalleled luxury in our state-of-the-art wellness sanctuary designed for holistic
              rejuvenation.
            </p>
          </div>
          <div className="bg-[#4C5A4B] p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-white text-xl font-semibold mb-2">Longevity Focus</h3>
            <p className="text-[#E8E0D4]">
              Our innovative approach combines ancient wisdom with cutting-edge science to enhance health and extend
              vitality.
            </p>
          </div>
          <div className="bg-[#4C5A4B] p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-white text-xl font-semibold mb-2">Prime Location</h3>
            <p className="text-[#E8E0D4]">
              Situated in a breathtaking riverfront setting in Bali, offering the perfect blend of serenity and
              accessibility.
            </p>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6 border-t border-[#E8E0D4]/20">
        <div className="flex justify-between items-center">
          <p className="text-[#E8E0D4]/80 text-sm">&copy; {new Date().getFullYear()} Sanctum. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-[#E8E0D4]/80 hover:text-[#E8E0D4] text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#E8E0D4]/80 hover:text-[#E8E0D4] text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
