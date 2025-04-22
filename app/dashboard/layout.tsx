"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Building2,
  ChevronRight,
  Compass,
  FileText,
  Globe,
  Hexagon,
  Home,
  Menu,
  PieChart,
  Users,
  X,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick?: () => void
}

function NavItem({ href, icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive ? "bg-[#B68D53] text-white" : "text-[#503E24] hover:bg-[#B68D53]/10 hover:text-[#503E24]",
      )}
    >
      {icon}
      <span>{label}</span>
      {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const navItems = [
    { href: "/dashboard", icon: <Home className="h-5 w-5" />, label: "Overview" },
    { href: "/dashboard/opportunity", icon: <PieChart className="h-5 w-5" />, label: "Investment Opportunity" },
    { href: "/dashboard/sanctuary", icon: <Building2 className="h-5 w-5" />, label: "The Sanctuary" },
    { href: "/dashboard/pillars", icon: <Hexagon className="h-5 w-5" />, label: "Six Pillars" },
    { href: "/dashboard/market", icon: <BarChart3 className="h-5 w-5" />, label: "Market Analysis" },
    { href: "/dashboard/location", icon: <Compass className="h-5 w-5" />, label: "Location" },
    { href: "/dashboard/expansion", icon: <Globe className="h-5 w-5" />, label: "Global Expansion" },
    { href: "/dashboard/financials", icon: <FileText className="h-5 w-5" />, label: "Financial Projections" },
    { href: "/dashboard/team", icon: <Users className="h-5 w-5" />, label: "Team" },
  ]

  const sidebar = (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 bg-[#B68D53] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-[#503E24]">SANCTUM</span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <div className="rounded-lg bg-[#F8F5F0] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-[#503E24]">Need assistance?</span>
          </div>
          <div className="text-xs text-[#503E24]/70 mb-3">
            Contact our investment team for more information or to schedule a call.
          </div>
          <Button className="w-full bg-[#B68D53] hover:bg-[#A67D43] text-white">Contact Us</Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {isMobile ? (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute left-4 top-4 z-50 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            {sidebar}
          </SheetContent>
        </Sheet>
      ) : (
        <div className="hidden md:block w-72 border-r bg-white">{sidebar}</div>
      )}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-white flex items-center px-4 md:px-6">
          {isMobile && <div className="w-8" />}
          <div className="font-semibold text-[#503E24]">Sanctum Bali Investment Opportunity</div>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/dashboard/invite-colleague">
              <Button variant="outline" className="text-[#503E24] border-[#503E24]/20">
                Invite a Colleague
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto py-6 px-4 md:px-6 lg:px-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
