"use client"

import { Trash2 } from "lucide-react"
import { useState } from "react"

export default function DeleteButtonStyles() {
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null)

  const handleSelect = (styleNumber: number) => {
    setSelectedStyle(styleNumber)
  }

  return (
    <div className="p-8 bg-[#3B4A3A] min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Delete Button Style Alternatives</h1>
      <p className="text-[#E8E0D4] mb-8">
        Select a style that works best with our green background while still indicating a critical action.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Style 1: Subtle background with red accent */}
        <div
          className={`p-6 rounded-lg border-2 ${selectedStyle === 1 ? "border-[#B68D53]" : "border-transparent"} bg-[#2A362A] transition-all`}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Style 1: Subtle Background</h2>
          <p className="text-[#E8E0D4]/80 mb-6">Red icon and text with a darker background for better contrast.</p>

          <div className="flex justify-center mb-4">
            <button className="px-4 py-2 bg-[#2A362A] text-red-400 border border-red-400 rounded hover:bg-[#3A3A2A] transition-colors flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>

          <button
            onClick={() => handleSelect(1)}
            className="w-full mt-4 px-4 py-2 bg-[#B68D53] text-white rounded hover:bg-[#A67D43] transition-colors"
          >
            {selectedStyle === 1 ? "Selected" : "Select This Style"}
          </button>
        </div>

        {/* Style 2: Red background with transparency */}
        <div
          className={`p-6 rounded-lg border-2 ${selectedStyle === 2 ? "border-[#B68D53]" : "border-transparent"} bg-[#2A362A] transition-all`}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Style 2: Semi-Transparent</h2>
          <p className="text-[#E8E0D4]/80 mb-6">
            Semi-transparent red background with white text for better visibility.
          </p>

          <div className="flex justify-center mb-4">
            <button className="px-4 py-2 bg-red-700/40 text-white border border-red-400 rounded hover:bg-red-700/60 transition-colors flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>

          <button
            onClick={() => handleSelect(2)}
            className="w-full mt-4 px-4 py-2 bg-[#B68D53] text-white rounded hover:bg-[#A67D43] transition-colors"
          >
            {selectedStyle === 2 ? "Selected" : "Select This Style"}
          </button>
        </div>

        {/* Style 3: Solid red with darker shade */}
        <div
          className={`p-6 rounded-lg border-2 ${selectedStyle === 3 ? "border-[#B68D53]" : "border-transparent"} bg-[#2A362A] transition-all`}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Style 3: Dark Red</h2>
          <p className="text-[#E8E0D4]/80 mb-6">Darker red that complements the green while still indicating danger.</p>

          <div className="flex justify-center mb-4">
            <button className="px-4 py-2 bg-[#8B3A3A] text-white rounded hover:bg-[#9B4A4A] transition-colors flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>

          <button
            onClick={() => handleSelect(3)}
            className="w-full mt-4 px-4 py-2 bg-[#B68D53] text-white rounded hover:bg-[#A67D43] transition-colors"
          >
            {selectedStyle === 3 ? "Selected" : "Select This Style"}
          </button>
        </div>
      </div>

      {selectedStyle && (
        <div className="mt-12 p-6 bg-[#2A362A] rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Selected Style: {selectedStyle}</h2>
          <p className="text-[#E8E0D4] mb-6">Here's the code for your selected delete button style:</p>

          <div className="bg-[#1E2A1E] p-4 rounded-md overflow-x-auto">
            <pre className="text-[#E8E0D4] text-sm">
              {selectedStyle === 1 &&
                `<Button
  variant="outline"
  size="sm"
  className="bg-[#2A362A] text-red-400 border border-red-400 hover:bg-[#3A3A2A]"
  onClick={() => setUserToDelete(user)}
>
  <Trash2 className="h-4 w-4 mr-1" />
  Delete
</Button>`}

              {selectedStyle === 2 &&
                `<Button
  variant="outline"
  size="sm"
  className="bg-red-700/40 text-white border border-red-400 hover:bg-red-700/60"
  onClick={() => setUserToDelete(user)}
>
  <Trash2 className="h-4 w-4 mr-1" />
  Delete
</Button>`}

              {selectedStyle === 3 &&
                `<Button
  variant="outline"
  size="sm"
  className="bg-[#8B3A3A] text-white hover:bg-[#9B4A4A] border-none"
  onClick={() => setUserToDelete(user)}
>
  <Trash2 className="h-4 w-4 mr-1" />
  Delete
</Button>`}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
