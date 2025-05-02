"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function OpportunityPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
        <h1 className="text-3xl md:text-4xl font-bold text-white font-playfair">Investment Opportunity</h1>
        <p className="text-[#E8E0D4] text-lg">
          A unique opportunity to invest in Bali's premier wellness and longevity sanctuary
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#2A362A] border-[#B89068]/20 w-full justify-start">
            <TabsTrigger
              value="overview"
              className="text-[#E8E0D4] data-[state=active]:bg-[#B89068] data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="metrics"
              className="text-[#E8E0D4] data-[state=active]:bg-[#B89068] data-[state=active]:text-white"
            >
              Financial Metrics
            </TabsTrigger>
            <TabsTrigger
              value="structure"
              className="text-[#E8E0D4] data-[state=active]:bg-[#B89068] data-[state=active]:text-white"
            >
              Investment Structure
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="text-[#E8E0D4] data-[state=active]:bg-[#B89068] data-[state=active]:text-white"
            >
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-[#3B4A3A] border-[#B89068]/20">
              <CardHeader>
                <CardTitle className="text-white">Investment Highlights</CardTitle>
                <CardDescription className="text-[#E8E0D4]">Key reasons to invest in Sanctum Bali</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src="/bali-wellness-retreat.png"
                    alt="Sanctum Investment Overview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Market Opportunity</h3>
                    <ul className="space-y-2 text-[#E8E0D4]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#B89068] font-bold">•</span>
                        <span>Rapidly growing wellness tourism market with 10% annual growth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B89068] font-bold">•</span>
                        <span>Biotech industry projected at 19.4% CAGR growth to 2028</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B89068] font-bold">•</span>
                        <span>Bali's GDP expected to grow 300-500% over next 10 years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B89068] font-bold">•</span>
                        <span>First-mover advantage in holistic longevity sanctuary concept</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Competitive Advantages</h3>
                    <ul className="space-y-2 text-[#E8E0D4]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#B89068] font-bold">•</span>
                        <span>Unique riverfront property with waterfalls and sacred springs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B89068] font-bold">•</span>
                        <span>Bali's first comprehensive longevity clinic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B89068] font-bold">•</span>
                        <span>Experienced founding team with complementary skills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B89068] font-bold">•</span>
                        <span>Integrated approach combining Western science with Eastern healing wisdom</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card className="bg-[#3B4A3A] border-[#B89068]/20">
              <CardHeader>
                <CardTitle className="text-white">Key Financial Metrics</CardTitle>
                <CardDescription className="text-[#E8E0D4]">
                  Projected financial performance over 10 years
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-[#2A362A] p-6 rounded-lg">
                    <div className="text-[#B89068] text-4xl font-bold mb-2">23%</div>
                    <h3 className="text-white text-xl font-semibold mb-2">IRR</h3>
                    <p className="text-[#E8E0D4]">
                      Exceptional Internal Rate of Return, demonstrating the strong investment potential of Sanctum.
                    </p>
                  </div>
                  <div className="bg-[#2A362A] p-6 rounded-lg">
                    <div className="text-[#B89068] text-4xl font-bold mb-2">45%</div>
                    <h3 className="text-white text-xl font-semibold mb-2">EBITDA Margin</h3>
                    <p className="text-[#E8E0D4]">
                      Industry-leading operational profitability, reflecting our premium positioning and efficient
                      business model.
                    </p>
                  </div>
                  <div className="bg-[#2A362A] p-6 rounded-lg">
                    <div className="text-[#B89068] text-4xl font-bold mb-2">13%</div>
                    <h3 className="text-white text-xl font-semibold mb-2">CAGR</h3>
                    <p className="text-[#E8E0D4]">
                      Compound Annual Growth Rate, delivering strong double-digit growth year over year.
                    </p>
                  </div>
                  <div className="bg-[#2A362A] p-6 rounded-lg">
                    <div className="text-[#B89068] text-4xl font-bold mb-2">&lt; 5 yrs</div>
                    <h3 className="text-white text-xl font-semibold mb-2">Payback Period</h3>
                    <p className="text-[#E8E0D4]">Time to recover each tranche of capital investment.</p>
                  </div>
                  <div className="bg-[#2A362A] p-6 rounded-lg">
                    <div className="text-[#B89068] text-4xl font-bold mb-2">$40.4M</div>
                    <h3 className="text-white text-xl font-semibold mb-2">Total Return</h3>
                    <p className="text-[#E8E0D4]">Total Return on Investment, providing an Equity Multiple of 3.45</p>
                  </div>
                  <div className="bg-[#2A362A] p-6 rounded-lg">
                    <div className="text-[#B89068] text-4xl font-bold mb-2">$11.7M</div>
                    <h3 className="text-white text-xl font-semibold mb-2">Total Investment</h3>
                    <p className="text-[#E8E0D4]">Capital required to fully develop and launch Sanctum Bali.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <Card className="bg-[#3B4A3A] border-[#B89068]/20">
              <CardHeader>
                <CardTitle className="text-white">Investment Structure</CardTitle>
                <CardDescription className="text-[#E8E0D4]">Equity distribution and investment terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Equity Distribution</h3>
                    <div className="aspect-square relative">
                      <Image
                        src="/equity-distribution-pie.png"
                        alt="Equity Distribution"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Investment Terms</h3>
                      <ul className="space-y-4 text-[#E8E0D4]">
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <div>
                            <span className="font-semibold">Investors Equity:</span> 33% ownership stake
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <div>
                            <span className="font-semibold">Founders Equity:</span> 33% ownership stake
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <div>
                            <span className="font-semibold">Options Pool:</span> 33% (includes key staff, land lease
                            extensions, and contingency)
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <div>
                            <span className="font-semibold">Investment Tranches:</span> Three rounds of funding over
                            2025-2027
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <div>
                            <span className="font-semibold">Preferred Returns:</span> 30% of EBITDA for each investment
                            tranche
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <div>
                            <span className="font-semibold">Total Return on Investment:</span> $40.4M on $11.7M
                            investment
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="bg-[#3B4A3A] border-[#B89068]/20">
              <CardHeader>
                <CardTitle className="text-white">Investment Timeline</CardTitle>
                <CardDescription className="text-[#E8E0D4]">Development and investment milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#B89068]/30"></div>
                  <div className="space-y-8 relative">
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#B89068] flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">2025: Initial Investment</h3>
                      <p className="text-[#E8E0D4] mb-2">$4.5M capital contribution for:</p>
                      <ul className="space-y-1 text-[#E8E0D4]">
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Land acquisition and initial development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Design and planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Core team establishment</span>
                        </li>
                      </ul>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#B89068] flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">2026: Construction Phase</h3>
                      <p className="text-[#E8E0D4] mb-2">$4.9M capital contribution for:</p>
                      <ul className="space-y-1 text-[#E8E0D4]">
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Main construction and infrastructure development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Equipment and furnishings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Brand development and marketing initiation</span>
                        </li>
                      </ul>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#B89068] flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">2027: Launch & Operations</h3>
                      <p className="text-[#E8E0D4] mb-2">$2.3M capital contribution for:</p>
                      <ul className="space-y-1 text-[#E8E0D4]">
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Final fit-out and operational setup</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Staff recruitment and training</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Marketing and launch activities</span>
                        </li>
                      </ul>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#B89068] flex items-center justify-center text-white font-bold">
                        4
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">2028-2034: Growth & Returns</h3>
                      <p className="text-[#E8E0D4] mb-2">Projected returns:</p>
                      <ul className="space-y-1 text-[#E8E0D4]">
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Positive EBITDA from 2028 onwards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Total investor share of EBITDA of $23.8M by 2034</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B89068] font-bold">•</span>
                          <span>Potential investor exit valuation of $16.6M in 2034</span>
                        </li>
                      </ul>
                    </div>
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
