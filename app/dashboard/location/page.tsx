"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24]">LOCATION</h1>
        <p className="text-[#503E24]/80 text-lg">
          Discover our exceptional location, offering the perfect blend of natural beauty and accessibility
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/bali-aerial-location.png" alt="Sanctum Location Aerial View" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <MapPin className="h-24 w-24 text-[#D4AF37]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#B68D53]/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#503E24]">Strategic Location</h3>
            <p className="text-[#503E24]/80">
              Sanctum is strategically positioned to offer the best of both worlds: the serene tranquility of a
              riverfront jungle setting combined with convenient access to Bali's most popular areas. This unique
              location provides an "Ubud in Canggu" experience that sets us apart from other wellness retreats on the
              island.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-[#503E24]/80 mt-4">
              <div>
                <p className="font-bold">Ubud</p>
                <p>50 mins</p>
              </div>
              <div>
                <p className="font-bold">Canggu</p>
                <p>15 mins</p>
              </div>
              <div>
                <p className="font-bold">Seminyak</p>
                <p>35 mins</p>
              </div>
              <div>
                <p className="font-bold">International Airport</p>
                <p>1 Hour</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <Image src="/bali-location-map.png" alt="Sanctum Location Map" fill className="object-cover" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {locationFeatures.map((feature, index) => (
          <Card key={index} className="border-[#B68D53]/20">
            <CardContent className="p-6 space-y-4">
              <div className="h-10 w-10 bg-[#B68D53] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-[#503E24]">{feature.title}</h3>
              <p className="text-[#503E24]/80">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/bali-waterfall-sanctuary.png" alt="Sanctum Waterfall" fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#503E24]">Natural Wonders</h3>
              <p className="text-[#503E24]/80">
                Our property features stunning natural waterfalls and sacred springs, creating a truly magical
                environment for healing and rejuvenation. These natural elements are integrated into our wellness
                programs, offering guests unique experiences that cannot be found elsewhere.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/bali-rice-terraces.png" alt="Surrounding Landscape" fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#503E24]">Surrounding Area</h3>
              <p className="text-[#503E24]/80">
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
