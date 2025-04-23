"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true)

      try {
        // Get session from storage
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Error getting session:", sessionError.message)
          setIsLoading(false)
          return
        }

        setSession(session)

        if (session?.user) {
          // Fetch user role from profiles
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single()

          console.log("Profile data for role:", profile, "Error:", profileError)

          if (profileError && profileError.code !== "PGRST116") {
            console.error("Error fetching profile:", profileError.message)
          }

          const userWithRole = {
            ...session.user,
            role: profile?.role || "standard",
          }

          setUser(userWithRole)
          setIsAdmin(profile?.role === "admin")
          console.log("User role set to:", profile?.role, "isAdmin:", profile?.role === "admin")
        } else {
          setUser(null)
          setIsAdmin(false)
        }

        // Set up auth state listener
        const {
          data: { subscription },
        } = await supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state changed:", event)
          setSession(session)

          if (session?.user) {
            // Fetch user role from profiles
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", session.user.id)
              .single()

            console.log("Profile data on auth change:", profile, "Error:", profileError)

            if (profileError && profileError.code !== "PGRST116") {
              console.error("Error fetching profile:", profileError.message)
            }

            const userWithRole = {
              ...session.user,
              role: profile?.role || "standard",
            }

            setUser(userWithRole)
            setIsAdmin(profile?.role === "admin")
            console.log("User role updated to:", profile?.role, "isAdmin:", profile?.role === "admin")
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
      } catch (error) {
        console.error("Unexpected error in auth initialization:", error)
        setIsLoading(false)
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
        console.error("Sign in error:", error.message)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Unexpected error during sign in:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Sign out error:", error.message)
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error)
    }
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
