export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          organization: string | null
          phone: string | null
          investor_type: string | null
          access_granted: boolean
          role: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          organization?: string | null
          phone?: string | null
          investor_type?: string | null
          access_granted?: boolean
          role?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          organization?: string | null
          phone?: string | null
          investor_type?: string | null
          access_granted?: boolean
          role?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      access_requests: {
        Row: {
          id: string
          user_id: string
          status: string
          created_at: string
          updated_at: string | null
          reviewed_by: string | null
          review_notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: string
          created_at?: string
          updated_at?: string | null
          reviewed_by?: string | null
          review_notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          created_at?: string
          updated_at?: string | null
          reviewed_by?: string | null
          review_notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
