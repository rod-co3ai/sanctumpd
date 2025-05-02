import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LogoOptionsPage() {
  // Array of sizes to display
  const sizes = [
    { name: "Extra Small (h-6)", logoClass: "h-6", wordClass: "h-12" },
    { name: "Small (h-8)", logoClass: "h-8", wordClass: "h-16" },
    { name: "Medium (h-10)", logoClass: "h-10", wordClass: "h-20" },
    { name: "Regular (h-12)", logoClass: "h-12", wordClass: "h-24" },
    { name: "Large (h-16)", logoClass: "h-16", wordClass: "h-32" },
    { name: "Extra Large (h-20)", logoClass: "h-20", wordClass: "h-40" },
    { name: "2XL (h-24)", logoClass: "h-24", wordClass: "h-48" },
    { name: "3XL (h-32)", logoClass: "h-32", wordClass: "h-64" },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Sanctum Logo Size Options</h1>
      <p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
        This page displays the Sanctum logo and word mark in 8 different sizes. For each option, the word mark is twice
        the height of the logo.
      </p>

      <div className="grid gap-8">
        {sizes.map((size, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle>{size.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#2C4C3B] p-6 rounded-lg flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/sanctum-logo.png"
                        alt="Sanctum Logo"
                        width={100}
                        height={100}
                        className={`w-auto ${size.logoClass} object-contain`}
                      />
                      <Image
                        src="/sanctum-word-gold.png"
                        alt="Sanctum Word"
                        width={200}
                        height={100}
                        className={`w-auto ${size.wordClass} object-contain`}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Dark Background</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white p-6 rounded-lg border flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/sanctum-logo.png"
                        alt="Sanctum Logo"
                        width={100}
                        height={100}
                        className={`w-auto ${size.logoClass} object-contain`}
                      />
                      <Image
                        src="/sanctum-word-gold.png"
                        alt="Sanctum Word"
                        width={200}
                        height={100}
                        className={`w-auto ${size.wordClass} object-contain`}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Light Background</span>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <code>
                  Logo: className="{size.logoClass}" | Word: className="{size.wordClass}"
                </code>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Once you've selected your preferred size, update the height classes in your application.
        </p>
      </div>
    </div>
  )
}
