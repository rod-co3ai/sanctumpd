"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function SetAdminPage() {
  const [email, setEmail] = useState("rodwilson77@gmail.com")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/set-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`User with email ${email} has been set as admin`)
        toast({
          title: "Success",
          description: `User with email ${email} has been set as admin`,
        })
      } else {
        setResult(`Error: ${data.error}`)
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Set Existing User as Admin</CardTitle>
          <CardDescription>Update an existing user to have admin privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Set as Admin"}
            </Button>
          </form>
        </CardContent>
        {result && (
          <CardFooter className={`bg-${result.includes("Error") ? "red" : "green"}-50 p-4 text-sm rounded-b-lg`}>
            <p className={result.includes("Error") ? "text-red-600" : "text-green-600"}>{result}</p>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
