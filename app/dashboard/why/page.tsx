"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

export default function WhyPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24]">WHY SANCTUM</h1>
        <p className="text-[#503E24]/80 text-lg">Discover what makes Sanctum unique and positioned for success</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/bali-jungle-retreat.png" alt="Sanctum Land" fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#503E24]">Land</h3>
              <p className="text-[#503E24]/80">
                Situated on a unique jungle riverfront property of unparalleled natural beauty, featuring waterfalls and
                sacred springs, just minutes from Canggu and the beachfront. This exceptional site offers an experience
                akin to "Ubud in Canggu" for those who appreciate its significance.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/bali-canggu-ubud-map.png" alt="Sanctum Location" fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#503E24]">Destination</h3>
              <p className="text-[#503E24]/80">
                Located in Bali, recognized globally as both a premier tourist destination and the wellness capital of
                the world, Sanctum is ideally positioned to attract a diverse and discerning clientele.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-[#503E24]/80">
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
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/serene-longevity-retreat.png" alt="Sanctum Concept" fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#503E24]">Concept</h3>
              <p className="text-[#503E24]/80">
                Our cutting-edge concept is at the forefront of current trends and is poised for exponential growth as
                awareness of longevity and holistic health continues to rise. We are committed to providing innovative
                solutions that meet the evolving demands of health-conscious individuals.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#B68D53]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video relative">
              <Image src="/diverse-wellness-team.png" alt="Sanctum Team" fill className="object-cover" />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#503E24]">Team</h3>
              <p className="text-[#503E24]/80">
                The founding team comprises highly experienced professionals with complementary skills, supported by a
                robust team of industry-leading advisors and consultants.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-white border-[#B68D53]/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="relative w-64 h-64">
                <Image
                  src="/placeholder.svg?height=300&width=300&query=golden interconnected circles diagram"
                  alt="Sanctum Interconnected Elements"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <div className="max-w-md space-y-4">
                <h3 className="text-2xl font-bold text-[#503E24]">Interconnected Excellence</h3>
                <p className="text-[#503E24]/80">
                  Sanctum's success is built on the perfect alignment of four key elements: exceptional land, strategic
                  destination, innovative concept, and an experienced team. This unique combination positions us to
                  create the premier longevity sanctuary in Asia.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
