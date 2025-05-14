"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export default function LocationPage() {
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

  const locationFeatures = [
    {
      title: "Riverfront Paradise",
      description: "Situated on a unique jungle riverfront property with waterfalls and sacred springs",
    },
    {
      title: "Proximity to Canggu",
      description: "Just 15 minutes from Canggu, offering the perfect balance of serenity and accessibility",
    },
    {
      title: "Natural Beauty",
      description: "Lush tropical surroundings with unparalleled natural beauty and biodiversity",
    },
    {
      title: "Sacred Energy",
      description: "Located near traditional Balinese temples and sacred sites, enhancing the spiritual experience",
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Location</h1>
        <p className="text-[#E8E0D4] text-lg">
          Discover our exceptional location, offering the perfect blend of natural beauty and accessibility
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B89068]/20 overflow-hidden bg-[#3B4A3A]">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <img
                src="https://raw.githubusercontent.com/rod-co3ai/sanctumpd/main/public/Render_04_Aerial.jpg"
                alt="Sanctum Location Aerial View"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <MapPin className="h-24 w-24 text-[#B89068]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Strategic Location</h3>
            <p className="text-[#E8E0D4]">
              Sanctum is strategically positioned to offer the best of both worlds: the serene tranquility of a
              riverfront jungle setting combined with convenient access to Bali's most popular areas. This unique
              location provides an "Ubud in Canggu" experience that sets us apart from other wellness retreats on the
              island.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-[#E8E0D4] mt-4">
              <div>
                <p className="font-bold text-white">Ubud</p>
                <p>50 mins</p>
              </div>
              <div>
                <p className="font-bold text-white">Canggu</p>
                <p>15 mins</p>
              </div>
              <div>
                <p className="font-bold text-white">Seminyak</p>
                <p>35 mins</p>
              </div>
              <div>
                <p className="font-bold text-white">International Airport</p>
                <p>1 Hour</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#B89068]/20 overflow-hidden bg-[#3B4A3A]">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <img
                src="https://raw.githubusercontent.com/rod-co3ai/sanctumpd/main/public/Render_12_Gateway.jpg"
                alt="Sanctum Location Map"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {locationFeatures.map((feature, index) => (
          <Card key={index} className="border-[#B89068]/20 bg-[#3B4A3A]">
            <CardContent className="p-6 space-y-4">
              <div className="h-10 w-10 bg-[#B89068] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-[#E8E0D4]">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#B89068]/20 overflow-hidden bg-[#3B4A3A]">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <img
                src="https://raw.githubusercontent.com/rod-co3ai/sanctumpd/main/public/Render_18_Waterfall.jpg"
                alt="Sanctum Waterfall"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Natural Wonders</h3>
              <p className="text-[#E8E0D4]">
                Our property features stunning natural waterfalls and sacred springs, creating a truly magical
                environment for healing and rejuvenation. These natural elements are integrated into our wellness
                programs, offering guests unique experiences that cannot be found elsewhere.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#B89068]/20 overflow-hidden bg-[#3B4A3A]">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <img
                src="https://raw.githubusercontent.com/rod-co3ai/sanctumpd/main/public/Render_06_SunLounges.jpg"
                alt="Surrounding Landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Surrounding Area</h3>
              <p className="text-[#E8E0D4]">
                The surrounding landscape offers breathtaking views of rice terraces, jungle canopies, and distant
                volcanic peaks. This picturesque setting provides the perfect backdrop for our wellness sanctuary,
                immersing guests in the natural beauty that Bali is famous for.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
