"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Settings, ChevronRight, Mail } from "lucide-react"

interface AdminNavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

function AdminNavItem({ href, icon, label, isActive }: AdminNavItemProps) {
  return (
    <Link
      href={href}
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

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
    { href: "/admin/access-requests", icon: <Mail className="h-5 w-5" />, label: "Access Requests" },
    { href: "/admin/users", icon: <Users className="h-5 w-5" />, label: "Users" },
    { href: "/admin/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ]

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 bg-[#B68D53] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-[#503E24]">ADMIN</span>
        </Link>
      </div>
      <div className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <AdminNavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-lg bg-[#F8F5F0] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-[#503E24]">Admin Portal</span>
          </div>
          <div className="text-xs text-[#503E24]/70 mb-3">Manage users, access requests, and system settings.</div>
          <Link href="/dashboard">
            <button className="w-full bg-[#B68D53] hover:bg-[#A67D43] text-white py-2 rounded-md text-sm">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
