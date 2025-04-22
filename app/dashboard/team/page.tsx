"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function TeamPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#503E24] font-playfair">Our Team</h1>
        <p className="text-[#503E24]/80 text-lg">Meet the experienced team behind Sanctum's vision and execution</p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="founders" className="space-y-6">
          <TabsList className="bg-white border-[#B68D53]/20">
            <TabsTrigger
              value="founders"
              className="text-[#503E24] data-[state=active]:bg-[#B68D53] data-[state=active]:text-white"
            >
              Founders
            </TabsTrigger>
            <TabsTrigger
              value="advisors"
              className="text-[#503E24] data-[state=active]:bg-[#B68D53] data-[state=active]:text-white"
            >
              Advisors & Consultants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="founders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Abel Kramer</CardTitle>
                  <CardDescription className="text-[#503E24]/70">Founder & Visionary</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    Serial entrepreneur with over 25 years of construction experience and 15+ years in Asia. Abel brings
                    extensive design and engineering expertise, having provided consultancy services to major clients
                    including Apple Inc and Foster + Partners. His vision and leadership drive Sanctum's innovative
                    approach to wellness architecture.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Alex Odonga</CardTitle>
                  <CardDescription className="text-[#503E24]/70">Investments & Legal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    With a background in global finance and law, Alex blends institutional expertise with a commitment
                    to purposeful ventures. As Principal of AIJ Holdings (formerly known as AI Global), a family-owned,
                    independent investment firm specializing in real estate projects, search funds, and late-stage
                    ventures, Alex ensures Sanctum is built for impact, integrity, and growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Rod Wilson</CardTitle>
                  <CardDescription className="text-[#503E24]/70">Finance & Operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    Strategic CFO, advisor, and systems builder with 20+ years of experience across finance and
                    operations. Rod is the financial architect behind Sanctum's growth model, with deep expertise in
                    turning vision into viable ventures. His operational acumen ensures the project's financial
                    sustainability and long-term success.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advisors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Dr. Steve James</CardTitle>
                  <CardDescription className="text-[#503E24]/70">Holistic Longevity Consultant</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    Cambridge University graduate with over 25 years of hospital experience and 12 years of consultant
                    experience in Sleep Medicine, Functional Medicine, nutrition, and blood chemistry. Trained with
                    Gabor Maté in trauma-informed psychotherapy.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Dr. Peter Malinowski</CardTitle>
                  <CardDescription className="text-[#503E24]/70">Professor of Neurology</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    Programme Leader for LJMU's MSc Positive Psychology and Wellbeing Programme and co-directs LJMU's
                    Research Centre for Brain and Behaviour. Brings cutting-edge neurological expertise to Sanctum's
                    wellness programs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Shadi Shahroudi</CardTitle>
                  <CardDescription className="text-[#503E24]/70">Spa & Wellness Expert</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    Spa and Wellness entrepreneur with 20+ years of experience in Europe and now leads a thriving Spa
                    business in Bali. Provides expertise in spa operations, treatments, and wellness program
                    development.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Nassim Abib</CardTitle>
                  <CardDescription className="text-[#503E24]/70">Culinary Consultant</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    Co-founder of Village, with over 10 years experience in heading operations for commercial catering
                    events and festivals, as well as meal plans for post-partum mothers. Brings farm-to-table expertise
                    to Sanctum's dining experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Advant</CardTitle>
                  <CardDescription className="text-[#503E24]/70">
                    Asia Centric Boutique Hospitality Advisors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    Specialized hospitality consultancy with deep expertise in the Asian luxury market, providing
                    strategic guidance on operations, guest experience, and market positioning.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#B68D53]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#503E24]">Aethos</CardTitle>
                  <CardDescription className="text-[#503E24]/70">Systems Driven Hospitality Advisors</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#503E24]/80">
                    Leading hospitality advisory firm focused on creating efficient operational systems and processes to
                    ensure exceptional guest experiences and operational excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-white border-[#B68D53]/20">
          <CardHeader>
            <CardTitle className="text-[#503E24]">Our Approach</CardTitle>
            <CardDescription className="text-[#503E24]/70">How our team delivers exceptional value</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#503E24]/80">
              The Sanctum team combines deep expertise across multiple disciplines to create a truly unique wellness and
              longevity sanctuary. Our founders bring complementary skills in construction, finance, and strategic
              vision, while our advisors and consultants provide specialized knowledge in wellness, hospitality, and
              health sciences.
            </p>
            <p className="text-[#503E24]/80">
              This integrated approach allows us to deliver a comprehensive wellness experience that merges ancient
              healing principles with cutting-edge science, all within a luxurious and sustainable environment. Our
              team's collective experience ensures that Sanctum will not only provide exceptional guest experiences but
              also deliver strong financial returns for our investors.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
