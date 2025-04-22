"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, ClipboardList, Settings, BarChart3, Mail, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "@/app/actions/auth-actions"

const adminNavItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Access Requests",
    href: "/admin/access-requests",
    icon: ClipboardList,
  },
  {
    name: "Invitations",
    href: "/admin/invitations",
    icon: Mail,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-[#B68D53]/20 p-4 flex flex-col h-screen">
      <div className="flex items-center justify-center mb-8 pt-4">
        <div className="h-12 w-12 bg-[#B68D53] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <span className="ml-2 text-xl font-bold text-[#503E24]">Admin</span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {adminNavItems.map((item) => (
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
        </ul>
      </nav>

      <div className="pt-4 border-t border-[#B68D53]/20 mt-4">
        <Link
          href="/dashboard"
          className="flex items-center p-2 rounded-md text-[#503E24] hover:bg-[#F8F5F0] transition-colors"
        >
          <Users className="h-5 w-5 mr-3" />
          Investor Dashboard
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center p-2 rounded-md text-[#503E24] hover:bg-[#F8F5F0] transition-colors mt-2"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
