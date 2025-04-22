/**
 * Utility functions for API calls with better error handling and rate limiting
 */

// Cache for admin status to prevent excessive API calls
type AdminStatusCache = {
  userId: string
  isAdmin: boolean
  timestamp: number
}

// In-memory cache (will reset on page refresh)
let adminStatusCache: AdminStatusCache | null = null

// Cache expiration time (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000

/**
 * Check if a user is an admin with caching to prevent excessive API calls
 */
export async function checkUserIsAdmin(supabase: any, userId: string): Promise<boolean> {
  // Check cache first
  if (adminStatusCache && adminStatusCache.userId === userId) {
    // If cache is still valid
    if (Date.now() - adminStatusCache.timestamp < CACHE_EXPIRATION) {
      return adminStatusCache.isAdmin
    }
  }

  try {
    // Add a delay to prevent rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Make the API call with proper error handling
    try {
      const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).single()

      if (error) {
        console.error("Error checking admin status:", error)
        return false
      }

      const isAdmin = data?.role === "admin"

      // Update cache
      adminStatusCache = {
        userId,
        isAdmin,
        timestamp: Date.now(),
      }

      return isAdmin
    } catch (error) {
      console.error("Error in Supabase query:", error)
      return false
    }
  } catch (error) {
    console.error("Unexpected error checking admin status:", error)
    return false
  }
}
