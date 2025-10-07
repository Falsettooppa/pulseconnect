import { useEffect, useState, createContext, useContext } from "react"
import { supabase } from "../lib/supabaseClient"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user || null
      setUser(currentUser)

      if (currentUser) {
        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single()

        // If not found, create one automatically
        if (!existingProfile) {
          await supabase.from("profiles").insert([
            {
              id: currentUser.id,
              full_name: currentUser.user_metadata.full_name || "New User",
              username:
                currentUser.email?.split("@")[0] || `user_${currentUser.id}`,
              email: currentUser.email,
            },
          ])
        }
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
