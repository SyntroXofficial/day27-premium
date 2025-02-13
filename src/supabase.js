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
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return user
  },
  user: () => {
    const { data: { session } } = supabase.auth.getSession()
    return session?.user || null
  },
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helper
export const db = supabase
