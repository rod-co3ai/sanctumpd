"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  LogOut,
  User,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/auth-context"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick?: () => void
}

// Update the NavItem component to use the new colors
function NavItem({ href, icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive ? "bg-sanctum-gold text-white" : "text-white hover:bg-white/10 hover:text-white",
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
  const { signOut } = useAuth()
  const router = useRouter()

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
    { href: "/dashboard/profile", icon: <User className="h-5 w-5" />, label: "Your Profile" },
  ]

  const sidebar = (
    <div className="flex h-full flex-col gap-2 bg-sanctum-green">
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 flex items-center justify-center">
            <img src="/sanctum-logo.png" alt="Sanctum" className="h-8 w-8" />
          </div>
          <span className="text-white">SANCTUM</span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto text-white" onClick={() => setIsSidebarOpen(false)}>
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
        <div className="rounded-lg bg-sanctum-darkgreen p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-white">Need assistance?</span>
          </div>
          <div className="text-xs text-white/70 mb-3">
            Contact our investment team for more information or to schedule a call.
          </div>
          <Button className="w-full bg-sanctum-gold hover:bg-sanctum-gold/80 text-white">Contact Us</Button>
        </div>
      </div>
    </div>
  )

  // Update the return statement to use the new colors
  return (
    <div className="flex min-h-screen bg-sanctum-green text-white">
      {isMobile ? (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute left-4 top-4 z-50 md:hidden text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-sanctum-green border-r-0">
            {sidebar}
          </SheetContent>
        </Sheet>
      ) : (
        <div className="hidden md:block w-72 border-r border-white/10 bg-sanctum-green">{sidebar}</div>
      )}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-white/10 bg-sanctum-green flex items-center px-4 md:px-6">
          {isMobile && <div className="w-8" />}
          <div className="font-semibold text-white">Sanctum Bali Investment Opportunity</div>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/dashboard/invite-colleague">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Invite a Colleague
              </Button>
            </Link>
            <Button
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={async () => {
                await signOut()
                router.push("/login")
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-sanctum-green">
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
