import type React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg"
}

export function Loader({ size = "default", className, ...props }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader2
        className={cn("animate-spin text-muted-foreground", {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "default",
          "h-10 w-10": size === "lg",
        })}
      />
    </div>
  )
}
