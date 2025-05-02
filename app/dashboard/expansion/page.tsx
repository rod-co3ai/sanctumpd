"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { Globe, MapPin } from "lucide-react"

export default function ExpansionPage() {
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

  const expansionLocations = [
    {
      name: "Mexico",
      year: "2028-2029",
      description: "Targeting the North American market with a focus on holistic wellness and ancient Mayan traditions",
      features: ["Beachfront property", "Mayan-inspired treatments", "North American accessibility"],
    },
    {
      name: "Switzerland",
      year: "2030-2031",
      description: "Bringing alpine wellness to the European market with cutting-edge medical technologies",
      features: ["Alpine setting", "Medical wellness focus", "European luxury market"],
    },
    {
      name: "UAE",
      year: "2032-2033",
      description: "Expanding to the Middle East with a desert oasis concept focused on luxury and exclusivity",
      features: ["Desert wellness", "Luxury positioning", "Middle Eastern accessibility"],
    },
    {
      name: "Japan",
      year: "2033-2034",
      description: "Integrating Japanese wellness traditions with our holistic approach in a mountain retreat setting",
      features: ["Onsen integration", "Forest bathing", "Asian market expansion"],
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Global Expansion</h1>
        <p className="text-[#E8E0D4] text-lg">
          Our vision to create a global network of Sanctum wellness retreats over the next decade
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B89068]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/global-sanctum-network.png" alt="Global Expansion Map" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Globe className="h-24 w-24 text-[#B89068]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B89068]/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Expansion Strategy</h3>
            <p className="text-[#E8E0D4]">
              Our global expansion strategy is designed to create a network of Sanctum retreats in key locations around
              the world, each offering our signature approach to wellness and longevity while incorporating elements of
              local culture and healing traditions. This strategic growth will allow us to serve a global clientele and
              establish Sanctum as the premier brand in luxury wellness and longevity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-[#2A362A] p-4 rounded-lg">
                <p className="font-bold text-white">Phase 1: Bali</p>
                <p className="text-[#E8E0D4]">Establish flagship location and refine operational model</p>
              </div>
              <div className="bg-[#2A362A] p-4 rounded-lg">
                <p className="font-bold text-white">Phase 2: Global Expansion</p>
                <p className="text-[#E8E0D4]">Strategic rollout to four key international locations</p>
              </div>
              <div className="bg-[#2A362A] p-4 rounded-lg">
                <p className="font-bold text-white">Phase 3: Brand Network</p>
                <p className="text-[#E8E0D4]">Establish Sanctum as a global wellness and longevity brand</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-white mb-6">Future Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expansionLocations.map((location, index) => (
            <Card key={index} className="border-[#B89068]/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-[#B89068] rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{location.name}</h3>
                    <p className="text-sm text-[#E8E0D4]/60">{location.year}</p>
                  </div>
                </div>
                <p className="text-[#E8E0D4]">{location.description}</p>
                <div className="flex flex-wrap gap-2">
                  {location.features.map((feature, idx) => (
                    <span key={idx} className="bg-[#2A362A] px-3 py-1 rounded-full text-sm text-[#E8E0D4]">
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B89068]/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">365-Day Wellness Platform</h3>
              <p className="text-[#E8E0D4] max-w-3xl mx-auto">
                Supporting our physical locations, our digital platform will connect members year-round, providing
                ongoing health tracking, personalized wellness programs, and access to our global community of experts
                and like-minded individuals. This digital ecosystem will enhance the Sanctum experience beyond the
                physical stays and create additional revenue streams.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
