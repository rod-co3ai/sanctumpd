"use client"

import type React from "react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { cn } from "@/lib/utils"

interface SanctumPhoneInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export const SanctumPhoneInput: React.FC<SanctumPhoneInputProps> = ({ value, onChange, className }) => {
  return (
    <div className={cn("phone-input-container", className)}>
      <PhoneInput
        international
        defaultCountry="US"
        placeholder="Enter phone number"
        value={value || undefined}
        onChange={(newValue) => onChange(newValue || "")}
        className="w-full rounded-md border border-[#B68D53]/20 p-2 focus:border-[#B68D53] focus:ring-[#B68D53]"
      />
      <style jsx global>{`
        .phone-input-container .PhoneInputInput {
          height: 2.5rem;
          border: none;
          outline: none;
          background: transparent;
        }
        .phone-input-container .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1rem;
        }
      `}</style>
    </div>
  )
}
