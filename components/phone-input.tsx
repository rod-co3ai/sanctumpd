"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Search } from "lucide-react"

// Comprehensive list of countries with full names and flags
const countryCodes = [
  { code: "+1", country: "United States", flag: "🇺🇸", shortCode: "US" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", shortCode: "GB" },
  { code: "+61", country: "Australia", flag: "🇦🇺", shortCode: "AU" },
  { code: "+1", country: "Canada", flag: "🇨🇦", shortCode: "CA" },
  { code: "+49", country: "Germany", flag: "🇩🇪", shortCode: "DE" },
  { code: "+33", country: "France", flag: "🇫🇷", shortCode: "FR" },
  { code: "+81", country: "Japan", flag: "🇯🇵", shortCode: "JP" },
  { code: "+86", country: "China", flag: "🇨🇳", shortCode: "CN" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰", shortCode: "HK" },
  { code: "+853", country: "Macau", flag: "🇲🇴", shortCode: "MO" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼", shortCode: "TW" },
  { code: "+91", country: "India", flag: "🇮🇳", shortCode: "IN" },
  { code: "+55", country: "Brazil", flag: "🇧🇷", shortCode: "BR" },
  { code: "+52", country: "Mexico", flag: "🇲🇽", shortCode: "MX" },
  { code: "+39", country: "Italy", flag: "🇮🇹", shortCode: "IT" },
  { code: "+34", country: "Spain", flag: "🇪🇸", shortCode: "ES" },
  { code: "+82", country: "South Korea", flag: "🇰🇷", shortCode: "KR" },
  { code: "+7", country: "Russia", flag: "🇷🇺", shortCode: "RU" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", shortCode: "NL" },
  { code: "+46", country: "Sweden", flag: "🇸🇪", shortCode: "SE" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", shortCode: "CH" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", shortCode: "SG" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪", shortCode: "AE" },
  { code: "+351", country: "Portugal", flag: "🇵🇹", shortCode: "PT" },
  { code: "+48", country: "Poland", flag: "🇵🇱", shortCode: "PL" },
  { code: "+43", country: "Austria", flag: "🇦🇹", shortCode: "AT" },
  { code: "+32", country: "Belgium", flag: "🇧🇪", shortCode: "BE" },
  { code: "+45", country: "Denmark", flag: "🇩🇰", shortCode: "DK" },
  { code: "+358", country: "Finland", flag: "🇫🇮", shortCode: "FI" },
  { code: "+30", country: "Greece", flag: "🇬🇷", shortCode: "GR" },
  { code: "+36", country: "Hungary", flag: "🇭🇺", shortCode: "HU" },
  { code: "+353", country: "Ireland", flag: "🇮🇪", shortCode: "IE" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺", shortCode: "LU" },
  { code: "+47", country: "Norway", flag: "🇳🇴", shortCode: "NO" },
  { code: "+40", country: "Romania", flag: "🇷🇴", shortCode: "RO" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰", shortCode: "SK" },
  { code: "+386", country: "Slovenia", flag: "🇸🇮", shortCode: "SI" },
  { code: "+90", country: "Turkey", flag: "🇹🇷", shortCode: "TR" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦", shortCode: "UA" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳", shortCode: "VN" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩", shortCode: "ID" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", shortCode: "MY" },
  { code: "+63", country: "Philippines", flag: "🇵🇭", shortCode: "PH" },
  { code: "+66", country: "Thailand", flag: "🇹🇭", shortCode: "TH" },
  { code: "+27", country: "South Africa", flag: "🇿🇦", shortCode: "ZA" },
  { code: "+20", country: "Egypt", flag: "🇪🇬", shortCode: "EG" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬", shortCode: "NG" },
  { code: "+254", country: "Kenya", flag: "🇰🇪", shortCode: "KE" },
  { code: "+972", country: "Israel", flag: "🇮🇱", shortCode: "IL" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", shortCode: "SA" },
  { code: "+964", country: "Iraq", flag: "🇮🇶", shortCode: "IQ" },
  { code: "+98", country: "Iran", flag: "🇮🇷", shortCode: "IR" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼", shortCode: "KW" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧", shortCode: "LB" },
  { code: "+968", country: "Oman", flag: "🇴🇲", shortCode: "OM" },
  { code: "+974", country: "Qatar", flag: "🇶🇦", shortCode: "QA" },
  { code: "+963", country: "Syria", flag: "🇸🇾", shortCode: "SY" },
  { code: "+967", country: "Yemen", flag: "🇾🇪", shortCode: "YE" },
  { code: "+93", country: "Afghanistan", flag: "🇦🇫", shortCode: "AF" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩", shortCode: "BD" },
  { code: "+975", country: "Bhutan", flag: "🇧🇹", shortCode: "BT" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭", shortCode: "KH" },
  { code: "+977", country: "Nepal", flag: "🇳🇵", shortCode: "NP" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰", shortCode: "PK" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰", shortCode: "LK" },
]

export type PhoneInputProps = {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SanctumPhoneInput({ value, onChange, className }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0])
  const [phoneNumber, setPhoneNumber] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Parse the initial value
  useEffect(() => {
    if (value) {
      // Try to extract country code and phone number
      for (const country of countryCodes) {
        if (value.startsWith(country.code)) {
          setSelectedCountry(country)
          setPhoneNumber(value.substring(country.code.length).trim())
          return
        }
      }
      // If no country code found, just set the phone number
      setPhoneNumber(value)
    }
  }, [])

  // Filter countries based on search term
  const filteredCountries = searchTerm
    ? countryCodes.filter(
        (country) =>
          country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.code.includes(searchTerm) ||
          country.shortCode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : countryCodes

  // Handle phone number changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value
    setPhoneNumber(newPhoneNumber)
    onChange(`${selectedCountry.code} ${newPhoneNumber}`)
  }

  // Handle country selection
  const handleCountrySelect = (country: (typeof countryCodes)[0]) => {
    setSelectedCountry(country)
    setIsOpen(false)
    onChange(`${country.code} ${phoneNumber}`)
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className="flex">
        <div
          className="flex items-center h-10 px-3 py-2 border border-r-0 border-input rounded-l-md bg-background cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-2 text-base w-6 inline-block text-center">{selectedCountry.flag}</span>
          <span className="mr-1">{selectedCountry.code}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          className="flex-1 h-10 rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#B68D53] focus:ring-offset-2"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-input bg-background shadow-md">
          <div className="sticky top-0 bg-background p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-8 pr-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#B68D53] focus:ring-offset-2"
              />
            </div>
          </div>
          <div className="p-1">
            {filteredCountries.map((country) => (
              <div
                key={`${country.code}-${country.country}`}
                className="flex items-center gap-2 px-3 py-2 hover:bg-[#F8F5F0] rounded-sm cursor-pointer"
                onClick={() => handleCountrySelect(country)}
              >
                <span className="text-base w-6 inline-block text-center">{country.flag}</span>
                <span className="flex-1 truncate">{country.country}</span>
                <span className="text-muted-foreground">{country.code}</span>
              </div>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted-foreground">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
