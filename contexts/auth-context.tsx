"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { getSupabaseClient } from "@/lib/supabase"

type UserWithRole = User & {
  role?: string
}

type AuthContextType = {
  user: UserWithRole | null
  session: Session | null
  isLoading: boolean
  isAdmin: boolean
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean
    error?: string
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithRole | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = getSupabaseClient()

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true)

      // Get session from storage
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)

      if (session?.user) {
        // Fetch user role from profiles
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

        const userWithRole = {
          ...session.user,
          role: profile?.role || "standard",
        }

        setUser(userWithRole)
        setIsAdmin(profile?.role === "admin")
      } else {
        setUser(null)
        setIsAdmin(false)
      }

      // Set up auth state listener
      const {
        data: { subscription },
      } = await supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session)

        if (session?.user) {
          // Fetch user role from profiles
          const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

          const userWithRole = {
            ...session.user,
            role: profile?.role || "standard",
          }

          setUser(userWithRole)
          setIsAdmin(profile?.role === "admin")
        } else {
          setUser(null)
          setIsAdmin(false)
        }

        setIsLoading(false)
      })

      setIsLoading(false)

      // Cleanup subscription
      return () => {
        subscription.unsubscribe()
      }
    }

    initializeAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Unexpected error during sign in:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
