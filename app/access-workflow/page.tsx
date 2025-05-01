"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Mail, ShieldCheck, UserCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AccessWorkflowPage() {
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

  const steps = [
    {
      title: "Registration",
      description:
        "Complete the registration form with your details. Only your email is required, but providing more information helps us process your request faster.",
      icon: <Mail className="h-10 w-10 text-[#B68D53]" />,
    },
    {
      title: "Verification",
      description:
        "Our team verifies your identity and investor status. This typically involves a brief email exchange and may include a request for additional documentation.",
      icon: <ShieldCheck className="h-10 w-10 text-[#B68D53]" />,
    },
    {
      title: "Review",
      description:
        "Your application is reviewed by our investment committee. We assess suitability based on investment goals, experience, and capacity.",
      icon: <Clock className="h-10 w-10 text-[#B68D53]" />,
    },
    {
      title: "Approval",
      description:
        "Upon approval, you'll receive login credentials via email. This typically occurs within 2-3 business days of your initial request.",
      icon: <CheckCircle className="h-10 w-10 text-[#B68D53]" />,
    },
    {
      title: "Access Granted",
      description:
        "Log in to access the full investment opportunity details, including financial projections, due diligence materials, and investment terms.",
      icon: <UserCheck className="h-10 w-10 text-[#B68D53]" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F5F0]">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 flex items-center justify-center">
            <img src="/sanctum-logo.png" alt="Sanctum" className="h-10 w-10" />
          </div>
          <span className="text-[#503E24] font-bold text-xl">SANCTUM</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline" className="text-[#503E24] border-[#503E24] hover:bg-[#503E24]/10">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#B68D53] text-white hover:bg-[#A67D43]">Register</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={item} className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#503E24] font-playfair">Access Request Process</h1>
            <p className="text-[#503E24]/80 text-lg">
              Our streamlined process ensures that qualified investors can quickly gain access to the Sanctum investment
              opportunity while maintaining appropriate security and compliance measures.
            </p>
          </motion.div>

          <motion.div variants={item} className="mt-16">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[28px] top-10 bottom-10 w-1 bg-[#B68D53]/20 hidden md:block"></div>

              <div className="space-y-12">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex flex-col md:flex-row gap-6"
                  >
                    <div className="flex-shrink-0 flex md:block">
                      <div className="h-14 w-14 rounded-full bg-white border-2 border-[#B68D53] flex items-center justify-center z-10">
                        {step.icon}
                      </div>
                      <div className="ml-4 md:hidden">
                        <h3 className="text-xl font-bold text-[#503E24]">{step.title}</h3>
                        <div className="text-[#503E24]/70 mt-1">Step {index + 1}</div>
                      </div>
                    </div>
                    <Card className="flex-1 border-[#B68D53]/20">
                      <CardHeader className="pb-2">
                        <div className="hidden md:block">
                          <CardTitle className="text-xl text-[#503E24]">{step.title}</CardTitle>
                          <CardDescription>Step {index + 1}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#503E24]/80">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-16 text-center">
            <Card className="border-[#B68D53]/20 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#503E24] mb-4">Ready to Begin?</h3>
                <p className="text-[#503E24]/80 mb-6">
                  Start your journey to becoming a Sanctum investor by completing our registration form. The entire
                  process typically takes 2-3 business days.
                </p>
                <Link href="/register">
                  <Button className="bg-[#B68D53] text-white hover:bg-[#A67D43] px-8 py-6 text-lg">
                    Request Access Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      <footer className="container mx-auto py-6 border-t border-[#503E24]/10">
        <div className="flex justify-between items-center">
          <p className="text-[#503E24]/60 text-sm">&copy; {new Date().getFullYear()} Sanctum. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-[#503E24]/60 hover:text-[#503E24] text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#503E24]/60 hover:text-[#503E24] text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
