"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

export default function SanctuaryPage() {
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

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Sanctum: The Longevity Sanctuary</h1>
        <p className="text-[#E8E0D4] text-lg">
          Discover a 36-suite sanctuary dedicated to personalised well-being and longevity.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B89068]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/balinese-serenity.png" alt="Sanctum Overview" fill className="object-cover" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#B89068]/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Welcome to Sanctum</h3>
            <p className="text-[#E8E0D4]">
              Our tailored programs merge ancient wisdom with modern science, guiding you through transformative
              experiences that unlock your potential for vibrant living.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#B89068]/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Innovative Longevity Clinic</h3>
            <p className="text-[#E8E0D4]">
              Bali's first longevity clinic, dedicated to comprehensive health analysis for our guests and members. Our
              state-of-the-art facility integrates cutting-edge technology with expert medical insights to craft
              personalised health assessments and longevity plans.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#B89068]/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">A Serene Tropical Haven</h3>
            <p className="text-[#E8E0D4]">
              Immerse yourself in the tranquil beauty of our architecturally inspired retreat, where temple-like
              aesthetics blend with biomimetic design. Each suite offers spacious private areas with uninterrupted views
              of the river or natural pools facing waterfalls.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-white mb-6">World-Class Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-[#B89068]/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <Image src="/balinese-farm-to-table-feast.png" alt="Farm-to-Table" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Farm-to-Table</h3>
                <p className="text-[#E8E0D4]">
                  Our sustainable organic/biodynamic farm offers a unique farm-to-table dining experience for our
                  restaurant and resort guests, while maintaining complete control over the quality of our produce.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#B89068]/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <Image src="/tropical-fitness-retreat.png" alt="State-of-the-Art Gym" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">State-of-the-Art Gym</h3>
                <p className="text-[#E8E0D4]">
                  Experience a world-class gym, exclusively for members and resort guests. Our elite facility features
                  the latest fitness technology and equipment, complemented by personalised training programs to help
                  you achieve your health and wellness goals.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#B89068]/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <Image src="/bali-spa-waterfall.png" alt="Luxury Spa" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Luxury Spa</h3>
                <p className="text-[#E8E0D4]">
                  Indulge in Bali's premier spa experience. Enjoy our unique hexagonal hammam, dry and infrared saunas,
                  all with stunning riverfront views. Rejuvenate in our cryotherapy and jacuzzi pools, overlooking the
                  waterfall and holy spring.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}
