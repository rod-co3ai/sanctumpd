"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"

export default function CommunityPage() {
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

  const locations = [
    { name: "Bali", active: true },
    { name: "Mexico", planned: true },
    { name: "Switzerland", planned: true },
    { name: "UAE", planned: true },
    { name: "Japan", planned: true },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24]">
          BUILDING A GLOBAL COMMUNITY AROUND PEAK HEALTH
        </h1>
        <p className="text-[#503E24]/80 text-lg">
          Sanctum's vision extends beyond Bali to create a global network of wellness retreats
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-white border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/global-wellness-retreats.png" alt="Global Expansion" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Globe className="h-24 w-24 text-[#D4AF37]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {locations.map((location) => (
          <Card
            key={location.name}
            className={`bg-white border-[#B68D53]/20 ${location.active ? "border-[#D4AF37]" : ""}`}
          >
            <CardContent className="p-4 text-center">
              <div
                className={`h-12 w-12 mx-auto rounded-full flex items-center justify-center ${location.active ? "bg-[#D4AF37]" : "bg-[#F8F5F0]"}`}
              >
                <Globe className={`h-6 w-6 ${location.active ? "text-white" : "text-[#503E24]/60"}`} />
              </div>
              <h3 className="mt-2 font-bold text-[#503E24]">{location.name}</h3>
              <p className="text-xs text-[#503E24]/60 mt-1">{location.active ? "Active" : "Planned"}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-[#B68D53]/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#503E24]">365-DAY WELLNESS</h3>
            <p className="text-[#503E24]/80">
              Stay connected year-round through our dedicated platform for members, driving ongoing client servicing and
              retention. This service includes ongoing health data tracking and access to inspirational wellness
              programs, ensuring peak health of our members between stays.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B68D53]/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#503E24]">THE INNER SANCTUM</h3>
            <p className="text-[#503E24]/80">
              Our exclusive membership platform for global thought leaders in wellness and longevity. Members enjoy live
              events with top biohacking experts, workshops, seminars, and podcasts, reinforcing Sanctum's position as
              the leading destination for longevity retreats, while expanding our outreach through a dynamic online
              presence.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B68D53]/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#503E24]">BEYOND BALI GLOBAL EXPANSION</h3>
            <p className="text-[#503E24]/80">
              Over the next 10 years, we plan to create a global network of Sanctum retreat centres. Four key
              destinations across Europe, the Americas, and the Middle East have been identified, each perfectly
              positioned to engage specific target audiences and maximize our global impact. By delivering a unified
              vision of peak health to every region of the world, we aim to transform the way wellness is experienced
              globally.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
