"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BarChart3, Building2, Compass, FileText, Globe, Hexagon } from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
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

  const keyMetrics = [
    { name: "IRR", value: "23%", description: "Internal Rate of Return" },
    {
      name: "Equity Multiple",
      value: "3.45x",
      description: "Total return over investment life",
    },
    { name: "EBITDA Margin", value: "45.12%", description: "Operational profitability" },
    { name: "Payback Period", value: "<5 years", description: "Time to recover capital" },
    { name: "CAGR", value: "13%", description: "Compound Annual Growth Rate" },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Sanctum Bali</h1>
          <p className="text-white/80 text-lg">
            A world-class longevity sanctuary and wellness retreat in Bali, offering unparalleled investment potential
            in the rapidly growing wellness and longevity market.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-sanctum-gold hover:bg-sanctum-gold/80 text-white">
              <Link href="/dashboard/opportunity" className="flex items-center gap-2">
                Investment Opportunity <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              <Link href="/dashboard/financials" className="flex items-center gap-2">
                Financial Projections <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/3 h-64 rounded-lg overflow-hidden">
          <img src="/balinese-river-retreat.png" alt="Sanctum Bali Retreat" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-2xl font-bold mb-4 text-white">Key Financial Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {keyMetrics.map((metric) => (
            <Card key={metric.name} className="border-sanctum-gold/20 bg-sanctum-darkgreen">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">{metric.name}</CardTitle>
                <CardDescription className="text-white/70">{metric.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sanctum-gold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-2xl font-bold mb-4 text-white">Explore the Opportunity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/dashboard/sanctuary">
            <Card className="border-sanctum-gold/20 hover:shadow-md transition-all bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">The Sanctuary</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">
                Discover our 36-suite sanctuary dedicated to personalized well-being and longevity in a serene tropical
                setting.
              </CardContent>
              <CardFooter>
                <Building2 className="h-5 w-5 text-sanctum-gold" />
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard/pillars">
            <Card className="border-sanctum-gold/20 hover:shadow-md transition-all bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">Six Pillars</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">
                Explore our comprehensive approach to peak health through six integrated pillars of wellness and
                longevity.
              </CardContent>
              <CardFooter>
                <Hexagon className="h-5 w-5 text-sanctum-gold" />
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard/market">
            <Card className="border-sanctum-gold/20 hover:shadow-md transition-all bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">Market Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">
                Review the market landscape and growth potential in Bali's tourism, wellness, and longevity sectors.
              </CardContent>
              <CardFooter>
                <BarChart3 className="h-5 w-5 text-sanctum-gold" />
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard/location">
            <Card className="border-sanctum-gold/20 hover:shadow-md transition-all bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">
                Situated on a unique jungle riverfront property of unparalleled natural beauty, just minutes from
                Canggu.
              </CardContent>
              <CardFooter>
                <Compass className="h-5 w-5 text-sanctum-gold" />
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard/expansion">
            <Card className="border-sanctum-gold/20 hover:shadow-md transition-all bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">Global Expansion</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">
                Learn about our plans to create a global network of Sanctum retreat centers over the next decade.
              </CardContent>
              <CardFooter>
                <Globe className="h-5 w-5 text-sanctum-gold" />
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard/financials">
            <Card className="border-sanctum-gold/20 hover:shadow-md transition-all bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">Financial Projections</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">
                Review detailed financial projections, revenue streams, and investment structure.
              </CardContent>
              <CardFooter>
                <FileText className="h-5 w-5 text-sanctum-gold" />
              </CardFooter>
            </Card>
          </Link>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card className="border-sanctum-gold/20 bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">Sanctum: The Longevity Sanctuary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white">
                  Sanctum is a 36-suite sanctuary dedicated to personalized well-being and longevity. Our tailored
                  programs merge ancient wisdom with modern science, guiding guests through transformative experiences
                  that unlock their potential for vibrant living.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-sanctum-green p-4 rounded-lg">
                    <p className="font-bold text-sanctum-gold">Innovative Longevity Clinic</p>
                    <p className="text-white/80">
                      Bali's first longevity clinic, dedicated to comprehensive health analysis for our guests and
                      members.
                    </p>
                  </div>
                  <div className="bg-sanctum-green p-4 rounded-lg">
                    <p className="font-bold text-sanctum-gold">A Serene Tropical Haven</p>
                    <p className="text-white/80">
                      Immerse yourself in the tranquil beauty of our architecturally inspired retreat, where temple-like
                      aesthetics blend with biomimetic design.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="investment">
            <Card className="border-sanctum-gold/20 bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">Investment Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white">
                  Sanctum offers a compelling investment opportunity with strong projected returns and multiple revenue
                  streams. Our business model combines luxury accommodation, wellness services, and innovative longevity
                  treatments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-sanctum-green p-4 rounded-lg">
                    <p className="font-bold text-sanctum-gold">Equity Stake</p>
                    <p className="text-white/80">33% equity available for investors</p>
                  </div>
                  <div className="bg-sanctum-green p-4 rounded-lg">
                    <p className="font-bold text-sanctum-gold">Investment Amount</p>
                    <p className="text-white/80">$11.72M total investment</p>
                  </div>
                  <div className="bg-sanctum-green p-4 rounded-lg">
                    <p className="font-bold text-sanctum-gold">Exit Strategy</p>
                    <p className="text-white/80">Strategic sale or IPO in 7-10 years</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team">
            <Card className="border-sanctum-gold/20 bg-sanctum-darkgreen">
              <CardHeader>
                <CardTitle className="text-white">Leadership Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white">
                  Our founding team comprises highly experienced professionals with complementary skills, supported by a
                  robust team of industry-leading advisors and consultants.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-sanctum-green p-4 rounded-lg">
                    <p className="font-bold text-sanctum-gold">Abel Kramer</p>
                    <p className="text-white/70">Founder & Visionary</p>
                    <p className="text-white/80 mt-2">
                      Serial entrepreneur with 25+ years of construction experience and 15+ years in Asia.
                    </p>
                  </div>
                  <div className="bg-sanctum-green p-4 rounded-lg">
                    <p className="font-bold text-sanctum-gold">Alex Odonga</p>
                    <p className="text-white/70">Investments & Legal</p>
                    <p className="text-white/80 mt-2">
                      Global finance and law expert, ensuring Sanctum is built for impact, integrity and growth.
                    </p>
                  </div>
                  <div className="bg-sanctum-green p-4 rounded-lg">
                    <p className="font-bold text-sanctum-gold">Rod Wilson</p>
                    <p className="text-white/70">Finance & Operations</p>
                    <p className="text-white/80 mt-2">
                      Strategic CFO with 20+ years experience across finance and operations.
                    </p>
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
