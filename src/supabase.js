import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dsavwtrxaztjqbhqjvab.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzYXZ3dHJ4YXp0anFiaHFqdmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NDMzMjksImV4cCI6MjA1NTAxOTMyOX0.j0CIkvT0eZRuSGVMIl8F3rLBGZjCSXD68jx2UG-C44U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const auth = {
  signUp: async (email, password) => {
    return await supabase.auth.signUp({ email, password })
  },
  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },
  signOut: async () => {
    return await supabase.auth.signOut()
  },
  getUser: () => {
    return supabase.auth.getUser()
  }
}

// Database helper functions
export const db = supabase

// Storage helper functions
export const storage = {
  from: (bucket) => supabase.storage.from(bucket)
}
