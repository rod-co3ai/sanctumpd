"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createAdminUser } from "@/app/actions/create-admin-user"

export default function CreateAdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; userId?: string } | null>(null)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const result = await createAdminUser(formData)
      setResult(result)

      if (result.success) {
        toast({
          title: "Success",
          description: "Admin user created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
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
          <CardTitle>Create Admin User</CardTitle>
          <CardDescription>Create a new user with admin privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue="rodwilson77@gmail.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (optional)</Label>
              <Input id="password" name="password" type="password" placeholder="Leave blank for random password" />
              <p className="text-sm text-muted-foreground">If left blank, a random password will be generated</p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Admin User"}
            </Button>
          </form>
        </CardContent>
        {result && (
          <CardFooter className={`bg-${result.success ? "green" : "red"}-50 p-4 text-sm rounded-b-lg`}>
            <div>
              <p className={`font-medium ${result.success ? "text-green-600" : "text-red-600"}`}>
                {result.success ? "Success" : "Error"}
              </p>
              <p className="mt-1">{result.message}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
