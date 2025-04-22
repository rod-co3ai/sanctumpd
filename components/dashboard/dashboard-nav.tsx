"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Users, Settings, LogOut, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "@/app/actions/auth-actions"
import { useAdmin } from "@/contexts/admin-context"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Investment Details",
    href: "/dashboard/investment",
    icon: FileText,
  },
  {
    name: "Invite Colleague",
    href: "/dashboard/invite-colleague",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { isAdmin } = useAdmin()

  return (
    <div className="w-64 bg-white border-r border-[#B68D53]/20 p-4 flex flex-col h-screen">
      <div className="flex items-center justify-center mb-8 pt-4">
        <div className="h-12 w-12 bg-[#B68D53] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <span className="ml-2 text-xl font-bold text-[#503E24]">Sanctum</span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center p-2 rounded-md text-[#503E24] hover:bg-[#F8F5F0] transition-colors",
                  pathname === item.href && "bg-[#F8F5F0] text-[#B68D53]",
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}

          {isAdmin && (
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 rounded-md text-[#503E24] hover:bg-[#F8F5F0] transition-colors mt-4 border-t border-[#B68D53]/20 pt-4"
              >
                <ShieldCheck className="h-5 w-5 mr-3 text-[#B68D53]" />
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="pt-4 border-t border-[#B68D53]/20 mt-4">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center p-2 rounded-md text-[#503E24] hover:bg-[#F8F5F0] transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
