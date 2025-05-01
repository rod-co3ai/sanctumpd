"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaletteOptions() {
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null)

  const palettes = [
    {
      id: "jungle-canopy",
      name: "Jungle Canopy",
      description: "Deep jungle greens with earthy undertones and warm gold accents",
      colors: {
        background: "#2C4A3C", // Deep jungle green
        darkBackground: "#1E3329", // Darker jungle green
        text: "#FFFFFF",
        subtext: "#E6DFD4", // Warm off-white
        accent: "#C5A05A", // Warm gold
        highlight: "#8A6D3B", // Earthy bronze
        muted: "#3D5A4C", // Muted jungle green
      },
    },
    {
      id: "tropical-forest",
      name: "Tropical Forest",
      description: "Vibrant jungle greens with warm gold highlights",
      colors: {
        background: "#2F5241", // Vibrant jungle green
        darkBackground: "#1F3A2D", // Darker tropical green
        text: "#FFFFFF",
        subtext: "#F0EBE0", // Warm cream
        accent: "#D4B06A", // Bright gold
        highlight: "#9A7D45", // Warm amber
        muted: "#3E624F", // Muted tropical green
      },
    },
    {
      id: "earthy-sanctuary",
      name: "Earthy Sanctuary",
      description: "Brown-tinted greens with terracotta accents",
      colors: {
        background: "#3B4A3A", // Earthy green
        darkBackground: "#2A362A", // Darker earthy green
        text: "#FFFFFF",
        subtext: "#E8E0D4", // Warm sand
        accent: "#B89068", // Terracotta gold
        highlight: "#8D6E4E", // Earthy terracotta
        muted: "#4C5A4B", // Muted earthy green
      },
    },
    {
      id: "bali-retreat",
      name: "Bali Retreat",
      description: "Olive-tinted greens with warm amber accents",
      colors: {
        background: "#3A4D3A", // Olive green
        darkBackground: "#2A3A2A", // Darker olive green
        text: "#FFFFFF",
        subtext: "#EAE2D6", // Warm ivory
        accent: "#C9A55F", // Amber gold
        highlight: "#9B7E48", // Warm amber
        muted: "#4B5D4B", // Muted olive green
      },
    },
    {
      id: "rainforest-luxury",
      name: "Rainforest Luxury",
      description: "Rich emerald greens with bronze accents",
      colors: {
        background: "#2A4A3E", // Rich emerald green
        darkBackground: "#1D3A30", // Darker emerald green
        text: "#FFFFFF",
        subtext: "#E4DCD0", // Warm cream
        accent: "#BF9456", // Bronze gold
        highlight: "#8F7042", // Rich bronze
        muted: "#3B5A4E", // Muted emerald green
      },
    },
  ]

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Sanctum Color Palette Options</h1>
        <p className="mb-8 text-gray-700">
          Select a color palette below to preview how it would look in the Sanctum application. Each palette is designed
          to match the jungle and earthy tones from the PDF.
        </p>

        <Tabs defaultValue={palettes[0].id} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            {palettes.map((palette) => (
              <TabsTrigger
                key={palette.id}
                value={palette.id}
                onClick={() => setSelectedPalette(palette.id)}
                className="relative"
              >
                <span>{palette.name}</span>
                <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                  <div className="w-1/5" style={{ backgroundColor: palette.colors.background }}></div>
                  <div className="w-1/5" style={{ backgroundColor: palette.colors.darkBackground }}></div>
                  <div className="w-1/5" style={{ backgroundColor: palette.colors.accent }}></div>
                  <div className="w-1/5" style={{ backgroundColor: palette.colors.highlight }}></div>
                  <div className="w-1/5" style={{ backgroundColor: palette.colors.muted }}></div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {palettes.map((palette) => (
            <TabsContent key={palette.id} value={palette.id}>
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4 mb-4">
                    {Object.entries(palette.colors).map(([name, color]) => (
                      <div key={name} className="text-center">
                        <div
                          className="w-16 h-16 rounded-md mb-2 border border-gray-200"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-xs text-gray-500">{name}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="rounded-lg p-8 shadow-lg"
                    style={{ backgroundColor: palette.colors.background, color: palette.colors.text }}
                  >
                    <h2 className="text-3xl font-bold mb-4 font-playfair" style={{ color: palette.colors.text }}>
                      Sanctum Wellness & Longevity
                    </h2>
                    <h3 className="text-xl mb-4" style={{ color: palette.colors.subtext }}>
                      A Sanctuary for Holistic Wellness in Bali
                    </h3>
                    <p className="mb-6" style={{ color: palette.colors.text }}>
                      Sanctum is a premier wellness and longevity sanctuary nestled in the lush landscapes of Bali. Our
                      holistic approach combines ancient wisdom with cutting-edge science to create transformative
                      experiences.
                    </p>
                    <div className="flex gap-4">
                      <button
                        className="px-4 py-2 rounded-md font-medium"
                        style={{ backgroundColor: palette.colors.accent, color: palette.colors.darkBackground }}
                      >
                        Primary Button
                      </button>
                      <button
                        className="px-4 py-2 rounded-md font-medium border"
                        style={{ borderColor: palette.colors.accent, color: palette.colors.accent }}
                      >
                        Secondary Button
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Card style={{ backgroundColor: palette.colors.darkBackground, color: palette.colors.text }}>
                      <CardHeader>
                        <CardTitle style={{ color: palette.colors.accent }}>Feature Card</CardTitle>
                        <CardDescription style={{ color: palette.colors.subtext }}>
                          Example of a feature card using this palette
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p style={{ color: palette.colors.text }}>
                          This card showcases how content would appear in the application using this color scheme.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          style={{ backgroundColor: palette.colors.accent, color: palette.colors.darkBackground }}
                        >
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>

                    <div style={{ backgroundColor: palette.colors.muted }} className="rounded-lg p-6">
                      <h4 className="text-lg font-bold mb-2" style={{ color: palette.colors.text }}>
                        Section Title
                      </h4>
                      <p className="mb-4" style={{ color: palette.colors.subtext }}>
                        This section demonstrates how text appears on a muted background variant.
                      </p>
                      <div
                        className="p-3 rounded-md"
                        style={{ backgroundColor: palette.colors.darkBackground, color: palette.colors.text }}
                      >
                        <p className="text-sm">Nested content example</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-lg p-6"
                    style={{ backgroundColor: palette.colors.background, color: palette.colors.text }}
                  >
                    <h3 className="text-xl font-bold mb-4" style={{ color: palette.colors.accent }}>
                      Typography Examples
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-4xl font-bold font-playfair" style={{ color: palette.colors.text }}>
                          Heading 1
                        </h1>
                        <p className="text-sm" style={{ color: palette.colors.subtext }}>
                          Font: Playfair Display, 36px, Bold
                        </p>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold font-playfair" style={{ color: palette.colors.text }}>
                          Heading 2
                        </h2>
                        <p className="text-sm" style={{ color: palette.colors.subtext }}>
                          Font: Playfair Display, 30px, Bold
                        </p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold" style={{ color: palette.colors.accent }}>
                          Heading 3
                        </h3>
                        <p className="text-sm" style={{ color: palette.colors.subtext }}>
                          Font: Inter, 24px, Bold, Accent Color
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xl font-medium" style={{ color: palette.colors.text }}>
                          Heading 4
                        </h4>
                        <p className="text-sm" style={{ color: palette.colors.subtext }}>
                          Font: Inter, 20px, Medium
                        </p>
                      </div>
                      <div>
                        <p className="text-base" style={{ color: palette.colors.text }}>
                          Body Text: This is an example of body text using the selected color palette. The text should
                          be easily readable against the background while maintaining the aesthetic of the design.
                        </p>
                        <p className="text-sm" style={{ color: palette.colors.subtext }}>
                          Font: Inter, 16px, Regular
                        </p>
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: palette.colors.subtext }}>
                          Caption Text: This smaller text is used for captions, footnotes, and other secondary
                          information.
                        </p>
                        <p className="text-xs" style={{ color: palette.colors.subtext }}>
                          Font: Inter, 14px, Regular
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-lg bg-white shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">About This Palette</h3>
                  <p className="text-gray-700 mb-4">{palette.description}</p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => alert(`Selected palette: ${palette.name}`)}
                      className="bg-gray-900 hover:bg-gray-800"
                    >
                      Select This Palette
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => alert(`Customizing palette: ${palette.name}`)}
                      className="text-gray-900 border-gray-900 hover:bg-gray-100"
                    >
                      Customize
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
