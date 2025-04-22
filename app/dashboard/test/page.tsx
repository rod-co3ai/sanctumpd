"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function TestDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        router.push("/login")
        return
      }

      setUser(data.user)
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Test</CardTitle>
          <CardDescription>You are logged in!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">User ID:</h3>
              <p className="text-sm text-gray-500">{user.id}</p>
            </div>
            <div>
              <h3 className="font-medium">Email:</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
