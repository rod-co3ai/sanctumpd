import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

export default function InvestmentPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair">Investment Opportunity</h1>
        <p className="text-[#503E24]/80 text-lg">Detailed information about the Sanctum Bali investment</p>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="border-[#B68D53] text-[#B68D53]">
          <Download className="mr-2 h-4 w-4" />
          Download Deck
        </Button>
        <Button className="bg-[#B68D53] hover:bg-[#A67D43] text-white">
          <ExternalLink className="mr-2 h-4 w-4" />
          Schedule Call
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-white border border-[#B68D53]/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card className="bg-white border-[#B68D53]/20">
            <CardHeader>
              <CardTitle className="text-[#503E24]">Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#503E24]/80">
                Sanctum Bali is a luxury wellness and longevity sanctuary located in the wellness capital of the world.
                Our vision is to create a premier destination that combines cutting-edge longevity treatments, holistic
                wellness practices, and luxury accommodations in one of the most beautiful settings on earth.
              </p>

              <div className="aspect-video bg-[#F8F5F0] rounded-md flex items-center justify-center">
                <p className="text-[#503E24]/50">Sanctum Bali Concept Rendering</p>
              </div>

              <h3 className="text-xl font-bold text-[#503E24] mt-6">Key Highlights</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#F8F5F0] p-4 rounded-md">
                  <h4 className="font-bold text-[#503E24] mb-2">Prime Location</h4>
                  <p className="text-sm text-[#503E24]/70">
                    5-acre beachfront property in Uluwatu, Bali's premium wellness destination
                  </p>
                </div>
                <div className="bg-[#F8F5F0] p-4 rounded-md">
                  <h4 className="font-bold text-[#503E24] mb-2">Luxury Accommodations</h4>
                  <p className="text-sm text-[#503E24]/70">30 private villas and 15 luxury suites with ocean views</p>
                </div>
                <div className="bg-[#F8F5F0] p-4 rounded-md">
                  <h4 className="font-bold text-[#503E24] mb-2">Wellness Facilities</h4>
                  <p className="text-sm text-[#503E24]/70">
                    State-of-the-art longevity clinic, spa, fitness center, and meditation spaces
                  </p>
                </div>
                <div className="bg-[#F8F5F0] p-4 rounded-md">
                  <h4 className="font-bold text-[#503E24] mb-2">Culinary Experience</h4>
                  <p className="text-sm text-[#503E24]/70">
                    Farm-to-table restaurant featuring organic, locally-sourced ingredients
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="mt-6">
          <Card className="bg-white border-[#B68D53]/20">
            <CardHeader>
              <CardTitle className="text-[#503E24]">Market Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#503E24]/80 mb-6">
                The global wellness market is valued at $1.5 trillion with strong post-pandemic growth. Wellness tourism
                is expected to reach $817 billion by 2022, growing at 10% annually - twice as fast as tourism overall.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#503E24] mb-4">Target Market</h3>
                  <ul className="space-y-2 text-[#503E24]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>High-net-worth individuals seeking premium wellness experiences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Health-conscious professionals looking for rejuvenation and longevity treatments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Wellness tourists from Asia Pacific, Europe, and North America</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Corporate retreat and wellness program participants</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#503E24] mb-4">Competitive Advantage</h3>
                  <ul className="space-y-2 text-[#503E24]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>First-of-its-kind integrated longevity and wellness sanctuary in Bali</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Partnerships with leading longevity researchers and practitioners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Prime beachfront location in Bali's most exclusive area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>
                        Comprehensive approach combining traditional wellness with cutting-edge longevity science
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-6">
          <Card className="bg-white border-[#B68D53]/20">
            <CardHeader>
              <CardTitle className="text-[#503E24]">Financial Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#503E24]/80 mb-6">
                Sanctum Bali offers a compelling investment opportunity with strong projected returns and multiple
                revenue streams.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#503E24] mb-4">Investment Structure</h3>
                  <ul className="space-y-2 text-[#503E24]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Total project cost: $45 million</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Equity raise: $18 million (40%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Debt financing: $27 million (60%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Minimum investment: $250,000</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#503E24] mb-4">Revenue Streams</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#F8F5F0] p-4 rounded-md">
                      <h4 className="font-bold text-[#503E24] mb-2">Accommodations</h4>
                      <p className="text-sm text-[#503E24]/70">
                        30 private villas and 15 luxury suites with premium pricing
                      </p>
                    </div>
                    <div className="bg-[#F8F5F0] p-4 rounded-md">
                      <h4 className="font-bold text-[#503E24] mb-2">Wellness Services</h4>
                      <p className="text-sm text-[#503E24]/70">
                        Longevity treatments, spa services, and wellness programs
                      </p>
                    </div>
                    <div className="bg-[#F8F5F0] p-4 rounded-md">
                      <h4 className="font-bold text-[#503E24] mb-2">F&B and Retail</h4>
                      <p className="text-sm text-[#503E24]/70">Restaurant, juice bar, and wellness product retail</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#503E24] mb-4">Projected Returns</h3>
                  <ul className="space-y-2 text-[#503E24]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Projected IRR: 22-25%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Equity multiple: 2.8x over 5 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Cash-on-cash return: 18% by Year 3</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B68D53] font-bold">•</span>
                      <span>Target exit: Year 5-7 through strategic sale or refinancing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <Card className="bg-white border-[#B68D53]/20">
            <CardHeader>
              <CardTitle className="text-[#503E24]">Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#503E24]/80 mb-6">
                Sanctum Bali is led by a team of experienced professionals with complementary skills and proven track
                records in wellness, hospitality, and real estate development.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-[#F8F5F0] rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-[#503E24]">Sarah Johnson</h3>
                  <p className="text-[#B68D53] mb-2">Founder & CEO</p>
                  <p className="text-sm text-[#503E24]/80">
                    Former executive at leading luxury wellness brand with 15+ years of experience in the wellness
                    industry. MBA from Harvard Business School.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-[#F8F5F0] rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-[#503E24]">David Chen</h3>
                  <p className="text-[#B68D53] mb-2">Chief Development Officer</p>
                  <p className="text-sm text-[#503E24]/80">
                    20+ years in luxury hotel development across Asia Pacific. Previously led development for a major
                    international hotel group.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-[#F8F5F0] rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-[#503E24]">Dr. Michael Patel</h3>
                  <p className="text-[#B68D53] mb-2">Medical Director</p>
                  <p className="text-sm text-[#503E24]/80">
                    Board-certified physician specializing in longevity medicine with 10+ years of experience in
                    integrative health and wellness.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-[#F8F5F0] rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-[#503E24]">Emma Rodriguez</h3>
                  <p className="text-[#B68D53] mb-2">Chief Financial Officer</p>
                  <p className="text-sm text-[#503E24]/80">
                    Former investment banker with expertise in hospitality and real estate finance. CFA charterholder
                    with MBA from INSEAD.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#503E24] mt-8 mb-4">Advisory Board</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#F8F5F0] p-4 rounded-md">
                  <h4 className="font-bold text-[#503E24]">Dr. Lisa Wong</h4>
                  <p className="text-sm text-[#B68D53]">Longevity Research</p>
                </div>
                <div className="bg-[#F8F5F0] p-4 rounded-md">
                  <h4 className="font-bold text-[#503E24]">Robert Tanaka</h4>
                  <p className="text-sm text-[#B68D53]">Luxury Hospitality</p>
                </div>
                <div className="bg-[#F8F5F0] p-4 rounded-md">
                  <h4 className="font-bold text-[#503E24]">Maria Garcia</h4>
                  <p className="text-sm text-[#B68D53]">Wellness Architecture</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card className="bg-white border-[#B68D53]/20">
            <CardHeader>
              <CardTitle className="text-[#503E24]">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#503E24]/80 mb-6">
                Sanctum Bali has a clear development timeline with key milestones to ensure successful execution and
                timely opening.
              </p>

              <div className="space-y-6">
                <div className="relative pl-8 pb-8 border-l-2 border-[#B68D53]/30">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#B68D53]"></div>
                  <h3 className="text-xl font-bold text-[#503E24]">Q3 2023 - Q1 2024</h3>
                  <p className="text-[#B68D53] mb-2">Planning & Financing</p>
                  <ul className="space-y-1 text-sm text-[#503E24]/80">
                    <li>• Complete equity fundraising</li>
                    <li>• Finalize land acquisition</li>
                    <li>• Secure necessary permits and approvals</li>
                    <li>• Complete architectural designs</li>
                  </ul>
                </div>

                <div className="relative pl-8 pb-8 border-l-2 border-[#B68D53]/30">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#B68D53]"></div>
                  <h3 className="text-xl font-bold text-[#503E24]">Q2 2024 - Q1 2025</h3>
                  <p className="text-[#B68D53] mb-2">Construction & Development</p>
                  <ul className="space-y-1 text-sm text-[#503E24]/80">
                    <li>• Break ground on main facilities</li>
                    <li>• Begin villa and suite construction</li>
                    <li>• Develop wellness center and spa</li>
                    <li>• Implement sustainable infrastructure</li>
                  </ul>
                </div>

                <div className="relative pl-8 pb-8 border-l-2 border-[#B68D53]/30">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#B68D53]"></div>
                  <h3 className="text-xl font-bold text-[#503E24]">Q2 2025</h3>
                  <p className="text-[#B68D53] mb-2">Pre-Opening</p>
                  <ul className="space-y-1 text-sm text-[#503E24]/80">
                    <li>• Staff recruitment and training</li>
                    <li>• Marketing and PR campaign launch</li>
                    <li>• Operational testing and soft opening</li>
                    <li>• Begin accepting reservations</li>
                  </ul>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-[#B68D53]"></div>
                  <h3 className="text-xl font-bold text-[#503E24]">Q3 2025</h3>
                  <p className="text-[#B68D53] mb-2">Grand Opening</p>
                  <ul className="space-y-1 text-sm text-[#503E24]/80">
                    <li>• Official grand opening ceremony</li>
                    <li>• Full operations commence</li>
                    <li>• Begin implementing expansion plans</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
