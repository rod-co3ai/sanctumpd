import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#B89068", // Terracotta gold
          foreground: "#FFFFFF", // White
        },
        secondary: {
          DEFAULT: "#8D6E4E", // Earthy terracotta
          foreground: "#FFFFFF", // White
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#4C5A4B", // Muted earthy green
          foreground: "#E8E0D4", // Warm sand
        },
        accent: {
          DEFAULT: "#8D6E4E", // Earthy terracotta
          foreground: "#FFFFFF", // White
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "#3B4A3A", // Earthy green
          foreground: "#FFFFFF", // White
        },
        // Add custom colors for direct access
        sanctuary: {
          background: "#3B4A3A", // Earthy green
          darkBackground: "#2A362A", // Darker earthy green
          text: "#FFFFFF", // White
          subtext: "#E8E0D4", // Warm sand
          gold: "#B89068", // Terracotta gold
          terracotta: "#8D6E4E", // Earthy terracotta
          mutedGreen: "#4C5A4B", // Muted earthy green
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        playfair: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
