import { useState, FormEvent } from "react"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"
import { Mail, Github, Twitter, Globe } from "lucide-react"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"password" | "magic">("password")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailSignup = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Signup successful! Please verify your email.")
      navigate("/login")
    }
  }

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/login` },
    })
    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Magic link sent! Please check your inbox.")
    }
  }

  const handleOAuth = async (provider: "google" | "github" | "twitter") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) alert(error.message)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pulse mb-8">
          Create Your PulseConnect Account
        </h1>

        {/* Mode Switch */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setMode("password")}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              mode === "password"
                ? "bg-pulse text-white shadow"
                : "border text-gray-700 hover:bg-gray-100"
            }`}
          >
            Password
          </button>
          <button
            onClick={() => setMode("magic")}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              mode === "magic"
                ? "bg-pulse text-white shadow"
                : "border text-gray-700 hover:bg-gray-100"
            }`}
          >
            Magic Link
          </button>
        </div>

        {/* Email + Password Signup */}
        {mode === "password" ? (
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/40"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pulse text-white py-3 rounded-lg font-semibold hover:bg-pulse/90 transition-all shadow-md"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        ) : (
          /* Magic Link Signup */
          <form onSubmit={handleMagicLink} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email for magic link"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pulse text-white py-3 rounded-lg font-semibold hover:bg-pulse/90 transition-all shadow-md"
            >
              {loading ? "Sending Link..." : "Send Magic Link"}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="my-8 flex items-center justify-center">
          <div className="border-t w-1/3"></div>
          <span className="mx-3 text-gray-400 text-sm">or continue with</span>
          <div className="border-t w-1/3"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleOAuth("google")}
            className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <Globe className="w-5 h-5 text-red-500" />
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuth("github")}
            className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
          <button
            onClick={() => handleOAuth("twitter")}
            className="flex items-center justify-center gap-2 w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-400 transition"
          >
            <Twitter className="w-5 h-5" />
            Continue with Twitter
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-pulse font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
