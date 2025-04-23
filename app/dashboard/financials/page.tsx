"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { BarChartIcon as BarIcon, DollarSign, LineChartIcon as LineIcon, PieChart, TrendingUp } from "lucide-react"
import { useState } from "react"
// Add these imports at the top of the file if they don't already exist
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

export default function FinancialsPage() {
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
    { name: "IRR", value: "23%", progress: 92 },
    { name: "Equity Multiple", value: "3.45x", progress: 85 },
    { name: "EBITDA Margin", value: "45.12%", progress: 90 },
    { name: "Payback Period", value: "<5 years", progress: 88 },
  ]

  const revenueStreams = [
    { name: "Accommodation", percentage: 40, color: "#B68D53" },
    { name: "Wellness Services", percentage: 25, color: "#D4AF37" },
    { name: "Food & Beverage", percentage: 15, color: "#503E24" },
    { name: "Longevity Treatments", percentage: 12, color: "#8A7250" },
    { name: "Retail & Other", percentage: 8, color: "#C9B38C" },
  ]

  const yearlyProjections = [
    { year: 2025, revenue: 0, ebitda: -0.71, phase: "Development" },
    { year: 2026, revenue: 0, ebitda: -1.03, phase: "Construction" },
    { year: 2027, revenue: 5.29, ebitda: 0.66, phase: "Soft Launch" },
    { year: 2028, revenue: 13.8, ebitda: 5.25, phase: "Operations" },
    { year: 2029, revenue: 15.64, ebitda: 6.97, phase: "Growth" },
    { year: 2030, revenue: 17.55, ebitda: 8.39, phase: "Maturity" },
    { year: 2031, revenue: 19.55, ebitda: 9.87, phase: "Expansion" },
    { year: 2032, revenue: 19.65, ebitda: 9.89, phase: "Expansion" },
    { year: 2033, revenue: 19.76, ebitda: 9.91, phase: "Expansion" },
    { year: 2034, revenue: 19.86, ebitda: 9.96, phase: "Exit" },
  ]

  // Exact values from the provided data table
  const yearlyInvestorReturns = [
    { year: 2025, return: 0, phase: "Development", percentage: 0 },
    { year: 2026, return: 0, phase: "Construction", percentage: 0 },
    { year: 2027, return: 0, phase: "Soft Launch", percentage: 0 },
    { year: 2028, return: 2.275, phase: "Operations", percentage: 9.55 },
    { year: 2029, return: 3.717, phase: "Growth", percentage: 15.6 },
    { year: 2030, return: 3.634, phase: "Maturity", percentage: 15.26 },
    { year: 2031, return: 4.277, phase: "Expansion", percentage: 17.95 },
    { year: 2032, return: 3.296, phase: "Expansion", percentage: 13.84 },
    { year: 2033, return: 3.304, phase: "Expansion", percentage: 13.87 },
    { year: 2034, return: 3.319, phase: "Exit", percentage: 13.93 },
  ]

  // Calculate cumulative returns
  const cumulativeReturns = yearlyInvestorReturns.reduce(
    (acc, item) => {
      const lastValue = acc.length > 0 ? acc[acc.length - 1].return : 0
      acc.push({
        year: item.year,
        return: lastValue + item.return,
        phase: item.phase,
      })
      return acc
    },
    [] as { year: number; return: number; phase: string }[],
  )

  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"yearly" | "cumulative">("yearly")

  // Find the maximum value for scaling
  const maxYearlyReturn = Math.max(...yearlyInvestorReturns.map((item) => item.return))
  const maxCumulativeReturn = Math.max(...cumulativeReturns.map((item) => item.return))
  const maxValue = viewMode === "yearly" ? maxYearlyReturn : maxCumulativeReturn

  // Calculate total returns
  const totalReturns = yearlyInvestorReturns.reduce((sum, item) => sum + item.return, 0)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24]">FINANCIAL PROJECTIONS</h1>
        <p className="text-[#503E24]/80 text-lg">
          Detailed financial projections and investment structure for Sanctum Bali
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B68D53]/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#503E24] mb-4">Investment Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#503E24]">Total Investment</span>
                    <span className="font-bold text-[#503E24]">$11.7M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#503E24]">Investor Equity</span>
                    <span className="font-bold text-[#503E24]">33%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#503E24]">Projected Exit Value</span>
                    <span className="font-bold text-[#503E24]">$16.6M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#503E24]">Investment Period</span>
                    <span className="font-bold text-[#503E24]">10 years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#503E24]">Total Return on Investment</span>
                    <span className="font-bold text-[#503E24]">$40.4M</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#503E24] mb-4">Investment Tranches</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#503E24]">Tranche 1 (2025): $4.5M</span>
                      <span className="text-sm text-[#503E24]/70">38.5%</span>
                    </div>
                    <Progress value={38.5} className="h-2" indicatorClassName="bg-[#B68D53]" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#503E24]">Tranche 2 (2026): $4.9M</span>
                      <span className="text-sm text-[#503E24]/70">41.8%</span>
                    </div>
                    <Progress value={41.8} className="h-2" indicatorClassName="bg-[#B68D53]" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#503E24]">Tranche 3 (2027): $2.3M</span>
                      <span className="text-sm text-[#503E24]/70">19.7%</span>
                    </div>
                    <Progress value={19.7} className="h-2" indicatorClassName="bg-[#B68D53]" />
                  </div>
                  <div className="mt-2 text-sm text-[#503E24] font-medium bg-[#F8F5F0] p-2 rounded-md">
                    Each investment tranche is repaid within 5 years of payment
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-[#503E24] mb-4">Key Financial Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric) => (
            <Card key={metric.name} className="border-[#B68D53]/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#503E24]">{metric.name}</h3>
                  <TrendingUp className="h-5 w-5 text-[#B68D53]" />
                </div>
                <div className="text-3xl font-bold text-[#B68D53]">{metric.value}</div>
                <Progress value={metric.progress} className="h-2" indicatorClassName="bg-[#B68D53]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="revenue">
              <PieChart className="h-4 w-4 mr-2" />
              Revenue Streams
            </TabsTrigger>
            <TabsTrigger value="projections">
              <LineIcon className="h-4 w-4 mr-2" />
              10-Year Projections
            </TabsTrigger>
            <TabsTrigger value="returns">
              <BarIcon className="h-4 w-4 mr-2" />
              Investor Returns
            </TabsTrigger>
          </TabsList>
          <TabsContent value="revenue">
            <Card className="border-[#B68D53]/20">
              <CardHeader>
                <CardTitle className="text-[#503E24]">Revenue Streams</CardTitle>
                <CardDescription className="text-[#503E24]/70">Breakdown of projected revenue sources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DollarSign className="h-12 w-12 text-[#B68D53]" />
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      {
                        revenueStreams.reduce(
                          (acc, stream, i) => {
                            const startAngle = acc.offset
                            const endAngle = startAngle + stream.percentage * 3.6
                            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                            const largeArcFlag = stream.percentage > 50 ? 1 : 0

                            acc.elements.push(
                              <path
                                key={i}
                                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                fill={stream.color}
                              />,
                            )
                            acc.offset = endAngle
                            return acc
                          },
                          { elements: [], offset: 0 },
                        ).elements
                      }
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {revenueStreams.map((stream) => (
                    <div key={stream.name} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: stream.color }}></div>
                        <span className="font-medium text-[#503E24]">{stream.name}</span>
                      </div>
                      <div className="text-lg font-bold text-[#503E24]">{stream.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projections">
            <Card className="border-[#B68D53]/20">
              <CardHeader>
                <CardTitle className="text-[#503E24]">10-Year Financial Projections</CardTitle>
                <CardDescription className="text-[#503E24]/70">
                  Revenue and EBITDA projections from 2025 to 2034
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#B68D53]/20">
                        <th className="text-left py-3 px-4 text-[#503E24]">Year</th>
                        <th className="text-left py-3 px-4 text-[#503E24]">Phase</th>
                        <th className="text-right py-3 px-4 text-[#503E24]">Revenue (M)</th>
                        <th className="text-right py-3 px-4 text-[#503E24]">EBITDA (M)</th>
                        <th className="text-right py-3 px-4 text-[#503E24]">EBITDA Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyProjections.map((year) => (
                        <tr key={year.year} className="border-b border-[#B68D53]/10">
                          <td className="py-3 px-4 text-[#503E24]">{year.year}</td>
                          <td className="py-3 px-4 text-[#503E24]">{year.phase}</td>
                          <td className="py-3 px-4 text-right text-[#503E24]">${year.revenue.toFixed(1)}M</td>
                          <td className="py-3 px-4 text-right text-[#503E24]">
                            <span className={year.ebitda < 0 ? "text-red-500" : "text-green-600"}>
                              ${year.ebitda.toFixed(1)}M
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-[#503E24]">
                            {year.revenue > 0 ? `${((year.ebitda / year.revenue) * 100).toFixed(1)}%` : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="returns">
            <Card className="border-[#B68D53]/20">
              <CardHeader>
                <CardTitle className="text-[#503E24]">Investor Returns</CardTitle>
                <CardDescription className="text-[#503E24]/70">
                  Projected returns on investment over the 10-year period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#F8F5F0] p-6 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-[#503E24] mb-2">Initial Investment</h3>
                    <div className="text-3xl font-bold text-[#B68D53]">$11.7M</div>
                    <p className="text-sm text-[#503E24]/70 mt-2">Total capital contribution</p>
                  </div>
                  <div className="bg-[#F8F5F0] p-6 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-[#503E24] mb-2">Total Returns</h3>
                    <div className="text-3xl font-bold text-[#B68D53]">$23.8M</div>
                    <p className="text-sm text-[#503E24]/70 mt-2">Total share of EBITDA</p>
                  </div>
                  <div className="bg-[#F8F5F0] p-6 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-[#503E24] mb-2">Equity Multiple</h3>
                    <div className="text-3xl font-bold text-[#B68D53]">3.45x</div>
                    <p className="text-sm text-[#503E24]/70 mt-2">Multiple on Invested Capital</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-[#503E24] text-xl">Yearly Investor Returns</h4>
                  <div className="flex items-center space-x-2 bg-[#F8F5F0] rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("yearly")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewMode === "yearly" ? "bg-[#B68D53] text-white" : "text-[#503E24] hover:bg-[#B68D53]/10"
                      }`}
                    >
                      Yearly
                    </button>
                    <button
                      onClick={() => setViewMode("cumulative")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewMode === "cumulative" ? "bg-[#B68D53] text-white" : "text-[#503E24] hover:bg-[#B68D53]/10"
                      }`}
                    >
                      Cumulative
                    </button>
                  </div>
                </div>

                <div className="h-96 bg-[#F8F5F0]/50 rounded-lg p-6 border border-[#B68D53]/20">
                  <ChartContainer
                    config={{
                      yearly: {
                        label: "Yearly Returns",
                        color: "hsl(var(--primary))",
                      },
                      cumulative: {
                        label: "Cumulative Returns",
                        color: "#D4AF37",
                      },
                    }}
                    className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      {viewMode === "yearly" ? (
                        <BarChart data={yearlyInvestorReturns} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#B68D5333" />
                          <XAxis
                            dataKey="year"
                            tick={{ fill: "#503E24", fontSize: 12 }}
                            axisLine={{ stroke: "#B68D5333" }}
                            tickLine={{ stroke: "#B68D5333" }}
                          />
                          <YAxis
                            tick={{ fill: "#503E24", fontSize: 12 }}
                            axisLine={{ stroke: "#B68D5333" }}
                            tickLine={{ stroke: "#B68D5333" }}
                            tickFormatter={(value) => `$${value}M`}
                            domain={[0, 5]}
                          />
                          <ChartTooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white p-3 border border-[#B68D53]/20 rounded-md shadow-md">
                                    <p className="font-medium text-[#503E24]">{label}</p>
                                    <p className="text-[#B68D53] font-bold">${payload[0].value.toFixed(2)}M</p>
                                    <p className="text-xs text-[#503E24]/70">{payload[0].payload.phase}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Bar
                            dataKey="return"
                            fill="var(--color-yearly)"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                            onMouseOver={(data) => setHoveredYear(data.year)}
                            onMouseLeave={() => setHoveredYear(null)}
                          >
                            {yearlyInvestorReturns.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={hoveredYear === entry.year ? "#D4AF37" : "var(--color-yearly)"}
                              />
                            ))}
                          </Bar>
                          <Legend
                            verticalAlign="top"
                            height={36}
                            formatter={(value) => <span className="text-[#503E24] font-medium">Yearly Returns</span>}
                          />
                        </BarChart>
                      ) : (
                        <LineChart data={cumulativeReturns} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#B68D5333" />
                          <XAxis
                            dataKey="year"
                            tick={{ fill: "#503E24", fontSize: 12 }}
                            axisLine={{ stroke: "#B68D5333" }}
                            tickLine={{ stroke: "#B68D5333" }}
                          />
                          <YAxis
                            tick={{ fill: "#503E24", fontSize: 12 }}
                            axisLine={{ stroke: "#B68D5333" }}
                            tickLine={{ stroke: "#B68D5333" }}
                            tickFormatter={(value) => `$${value}M`}
                          />
                          <ChartTooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white p-3 border border-[#B68D53]/20 rounded-md shadow-md">
                                    <p className="font-medium text-[#503E24]">{label}</p>
                                    <p className="text-[#D4AF37] font-bold">${payload[0].value.toFixed(2)}M</p>
                                    <p className="text-xs text-[#503E24]/70">{payload[0].payload.phase}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="return"
                            stroke="var(--color-cumulative)"
                            strokeWidth={3}
                            dot={{ fill: "var(--color-cumulative)", r: 4 }}
                            activeDot={{ r: 6, fill: "#D4AF37" }}
                            animationDuration={1500}
                          />
                          <Legend
                            verticalAlign="top"
                            height={36}
                            formatter={(value) => (
                              <span className="text-[#503E24] font-medium">Cumulative Returns</span>
                            )}
                          />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="text-center space-y-2 mt-6">
                  <motion.p
                    className="text-sm font-medium text-[#503E24]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    Total investor share of EBITDA reaches <span className="font-bold text-[#B68D53]">$23.8M</span> by
                    2034
                  </motion.p>
                  <motion.p
                    className="text-xs text-[#503E24]/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                  >
                    Returns begin in 2028 following the development and construction phases
                  </motion.p>
                  {viewMode === "cumulative" && (
                    <motion.div
                      className="flex items-center justify-center gap-2 text-xs text-[#503E24]/70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.9 }}
                    >
                      <div className="w-3 h-0 border-b-2 border-[#D4AF37]"></div>
                      <span>Cumulative returns trend</span>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-[#B68D53]/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-[#503E24]">Investment Structure</h3>
              <p className="text-[#503E24]/80 max-w-3xl mx-auto">
                Sanctum offers a compelling investment structure with 33% equity available to investors, staged capital
                contributions, and preferred returns of 30% of EBITDA for each investment tranche. This structure is
                designed to align interests, minimize risk, and maximize returns for all stakeholders.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
