"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Hexagon } from "lucide-react"

export default function PillarsPage() {
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

  const pillars = [
    {
      title: "Holistic Health Assessment",
      description:
        "Receive comprehensive health insights through blood analysis, DNA mapping, Gene Keys, Human Design, and astrology to create a personalised wellness plan.",
    },
    {
      title: "Nutritional Wellness & Detox",
      description:
        "Personalised nutrition planning, juice cleanses, kidney flushes, juice & water fasting, PRP/PRF treatments, IV infusions, colon hydrotherapy, and acupuncture.",
    },
    {
      title: "Fitness & Recovery Enhancement",
      description:
        "Enhance strength and recovery with customized fitness programs, cryotherapy, infrared sauna, hyperbaric chamber treatments, and Exercise with Oxygen Therapy (EWOT).",
    },
    {
      title: "Mind & Sleep Mastery",
      description:
        "Boost mental performance and improve sleep with supplements, mindfulness practices, sleep analysis, and environment optimization.",
    },
    {
      title: "Advanced Therapies & Biohacking",
      description:
        "Utilize advanced therapies like PEMF, red light therapy, and wearable gadgets to enhance healing, energy, and overall health.",
    },
    {
      title: "Relax, Balance & Connect",
      description:
        "Promote emotional well-being with nature hikes, Watsu, Breathwork, Meditation, Sensory Deprivation Tanks and Beji Blessing ceremonies for deep relaxation and reconnection.",
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24]">SANCTUM'S SIX PILLARS OF PEAK HEALTH</h1>
        <p className="text-[#503E24]/80 text-lg">
          Our comprehensive approach to wellness and longevity is built on six foundational pillars
        </p>
      </motion.div>

      <motion.div variants={item} className="flex justify-center py-8">
        <div className="relative w-64 h-64">
          <Hexagon className="w-full h-full text-[#D4AF37]" strokeWidth={1} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 bg-[#D4AF37] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => (
          <Card
            key={index}
            className="bg-white border-[#B68D53]/20 overflow-hidden hover:bg-[#F8F5F0] transition-colors"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-[#503E24]">{pillar.title}</h3>
              </div>
              <p className="text-[#503E24]/80">{pillar.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="pt-8">
        <Card className="bg-white border-[#B68D53]/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-[#503E24]">Integrated Approach to Wellness</h3>
              <p className="text-[#503E24]/80 max-w-3xl mx-auto">
                At Sanctum, we believe that true wellness comes from addressing all aspects of health simultaneously.
                Our six pillars work together to create a comprehensive approach to longevity and vitality, tailored to
                your unique needs and goals.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
