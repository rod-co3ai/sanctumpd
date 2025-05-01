import type React from "react"
export default function PaletteOptionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
