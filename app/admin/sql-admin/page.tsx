"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function SqlAdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const { toast } = useToast()

  const sqlQuery = `
-- This SQL will create a user with email rodwilson77@gmail.com and set them as admin
-- Run this in the Supabase SQL Editor

-- First, check if the user already exists
DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Try to get the user ID from auth.users
  SELECT id INTO user_id FROM auth.users WHERE email = 'rodwilson77@gmail.com';
  
  IF user_id IS NULL THEN
    RAISE NOTICE 'User does not exist. Please create the user first using Supabase Auth API.';
  ELSE
    -- Update the user's role in the profiles table
    UPDATE profiles SET role = 'admin' WHERE id = user_id;
    
    IF NOT FOUND THEN
      -- If the profile doesn't exist, create it
      INSERT INTO profiles (id, full_name, role) VALUES (user_id, 'Rod Wilson', 'admin');
    END IF;
    
    RAISE NOTICE 'User with ID % has been set as admin', user_id;
  END IF;
END $$;
  `

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(sqlQuery)
      toast({
        title: "Copied to clipboard",
        description: "SQL query copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>SQL Query to Set Admin</CardTitle>
          <CardDescription>
            Copy this SQL query and run it in the Supabase SQL Editor to set rodwilson77@gmail.com as admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm">{sqlQuery}</pre>
          </div>
          <div className="mt-4">
            <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium">Instructions:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Go to the Supabase Dashboard</li>
              <li>Navigate to the SQL Editor</li>
              <li>Paste the SQL query</li>
              <li>Run the query</li>
              <li>The user will be set as admin if they exist in the auth.users table</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
