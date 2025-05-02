"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function MarketPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-white">Market Landscape</h1>
        <p className="text-[#E8E0D4] text-lg">
          Bali is chosen to be the most popular destination in the world in the TripAdvisor Travelers' Choice Award 2024
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
          <CardContent className="p-6">
            <p className="text-[#E8E0D4]">
              The market for foreign investors has not yet fully rebounded to pre-pandemic levels. In 2019, Bali
              welcomed 6.3 million visitors, highlighting the current potential and optimal timing for investment
              opportunities. Star-rated hotels had an average occupancy rate of 62.19% in December 2023, indicating a
              healthy demand for premium accommodations.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">INTERNATIONAL</h3>
            <div className="flex items-center justify-center">
              <div className="h-32 w-32 bg-[#2A362A] rounded-full flex items-center justify-center">
                <span className="text-[#B89068] font-bold text-3xl">+136%</span>
              </div>
            </div>
            <div className="space-y-2 text-[#E8E0D4]">
              <p>
                <span className="font-bold">2023</span> - 5.3 million foreign visitors
              </p>
              <p>
                <span className="font-bold">2022</span> - 2.2 million foreign visitors
              </p>
              <p>In 2023, the average number of foreign visitors per month was approximately 439,438.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">DOMESTIC</h3>
            <div className="flex items-center justify-center">
              <div className="h-32 w-32 bg-[#2A362A] rounded-full flex items-center justify-center">
                <span className="text-[#B89068] font-bold text-3xl">+30%</span>
              </div>
            </div>
            <div className="space-y-2 text-[#E8E0D4]">
              <p>
                <span className="font-bold">2023</span> - 9.9 million visitors
              </p>
              <p>
                <span className="font-bold">2022</span> - 7.6 million visitors
              </p>
              <p>In 2023, the average number of domestic visitors per month was approximately 825,000.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
          <CardContent className="p-6 space-y-4 text-center">
            <h3 className="text-xl font-bold text-white">Bali's Growth</h3>
            <div className="flex items-center justify-center">
              <div className="h-24 w-24 bg-[#2A362A] rounded-full flex items-center justify-center">
                <span className="text-[#B89068] font-bold text-2xl">300-500%</span>
              </div>
            </div>
            <p className="text-[#E8E0D4]">
              GDP over next 10 years
              <br />
              ($15.4B Tourist Spend)
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
          <CardContent className="p-6 space-y-4 text-center">
            <h3 className="text-xl font-bold text-white">Wellness Industry</h3>
            <div className="flex items-center justify-center">
              <div className="h-24 w-24 bg-[#2A362A] rounded-full flex items-center justify-center">
                <span className="text-[#B89068] font-bold text-2xl">10%</span>
              </div>
            </div>
            <p className="text-[#E8E0D4]">
              Forecasted
              <br />
              Annual Growth
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
          <CardContent className="p-6 space-y-4 text-center">
            <h3 className="text-xl font-bold text-white">Biotech Industry</h3>
            <div className="flex items-center justify-center">
              <div className="h-24 w-24 bg-[#2A362A] rounded-full flex items-center justify-center">
                <span className="text-[#B89068] font-bold text-2xl">19.4%</span>
              </div>
            </div>
            <p className="text-[#E8E0D4]">
              CAGR Growth
              <br />
              to 2028
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Competitive Advantage</h3>
              <p className="text-[#E8E0D4] max-w-3xl mx-auto">
                Sanctum integrates Western scientific approaches with Eastern healing wisdom to establish the first and
                most holistic facility for longevity in the Asia-Pacific region, positioning us uniquely in a growing
                market with increasing demand for premium wellness experiences.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="tourism" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#2A362A]">
            <TabsTrigger
              value="tourism"
              className="data-[state=active]:bg-[#B89068] data-[state=active]:text-white text-[#E8E0D4]"
            >
              Tourism
            </TabsTrigger>
            <TabsTrigger
              value="wellness"
              className="data-[state=active]:bg-[#B89068] data-[state=active]:text-white text-[#E8E0D4]"
            >
              Wellness
            </TabsTrigger>
            <TabsTrigger
              value="longevity"
              className="data-[state=active]:bg-[#B89068] data-[state=active]:text-white text-[#E8E0D4]"
            >
              Longevity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tourism">
            <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
              <CardHeader>
                <CardTitle className="text-white">Tourism Market Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#E8E0D4]">
                  Bali's tourism industry is experiencing a strong recovery, with international arrivals increasing by
                  136% in 2023 compared to 2022. The island's unique blend of natural beauty, cultural heritage, and
                  wellness offerings positions it as a premier destination for high-end travelers seeking transformative
                  experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">Luxury Travel</p>
                    <p className="text-[#E8E0D4]">Growing at 8.2% annually</p>
                  </div>
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">Average Stay</p>
                    <p className="text-[#E8E0D4]">8.5 days for international visitors</p>
                  </div>
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">Spending</p>
                    <p className="text-[#E8E0D4]">$1,200 per visitor average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="wellness">
            <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
              <CardHeader>
                <CardTitle className="text-white">Wellness Industry Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#E8E0D4]">
                  The global wellness industry is projected to reach $7 trillion by 2025, with wellness tourism growing
                  at twice the rate of overall tourism. Bali has established itself as a global wellness hub, attracting
                  visitors specifically seeking holistic health experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">Wellness Tourism</p>
                    <p className="text-[#E8E0D4]">$919 billion global market</p>
                  </div>
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">Premium Segment</p>
                    <p className="text-[#E8E0D4]">Growing at 12% annually</p>
                  </div>
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">Wellness Travelers</p>
                    <p className="text-[#E8E0D4]">Spend 130% more than average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="longevity">
            <Card className="border-[#B89068]/20 bg-[#3B4A3A]">
              <CardHeader>
                <CardTitle className="text-white">Longevity Market Opportunity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#E8E0D4]">
                  The longevity market is experiencing unprecedented growth as consumers increasingly prioritize health
                  span extension and quality of life. This emerging sector represents a significant opportunity for
                  innovative wellness destinations that can integrate cutting-edge longevity science with holistic
                  approaches.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">Longevity Market</p>
                    <p className="text-[#E8E0D4]">$27 trillion by 2026</p>
                  </div>
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">Biohacking</p>
                    <p className="text-[#E8E0D4]">19.4% CAGR through 2028</p>
                  </div>
                  <div className="bg-[#2A362A] p-4 rounded-lg">
                    <p className="font-bold text-white">HNWI Spending</p>
                    <p className="text-[#E8E0D4]">$45,000+ annually on longevity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
