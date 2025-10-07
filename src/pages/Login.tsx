import { useState, FormEvent } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Mail, Github, Twitter, Globe } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login with email & password
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  // Magic link login
  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Magic link sent! Check your email to continue.");
    }
  };

  // OAuth login
  const handleOAuth = async (provider: "google" | "github" | "twitter") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) alert(error.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-pulse mb-6">
          Welcome Back 👋
        </h2>

        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setMode("password")}
            className={`px-4 py-2 rounded-full ${
              mode === "password"
                ? "bg-pulse text-white"
                : "border text-gray-600 hover:bg-gray-100"
            }`}
          >
            Password
          </button>
          <button
            onClick={() => setMode("magic")}
            className={`px-4 py-2 rounded-full ${
              mode === "magic"
                ? "bg-pulse text-white"
                : "border text-gray-600 hover:bg-gray-100"
            }`}
          >
            Magic Link
          </button>
        </div>

        {mode === "password" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pulse text-white py-3 rounded-lg hover:bg-pulse/90 transition"
            >
              {loading ? "Signing in..." : "Log In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email for magic link"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pulse text-white py-3 rounded-lg hover:bg-pulse/90 transition"
            >
              {loading ? "Sending Link..." : "Send Magic Link"}
            </button>
          </form>
        )}

        <div className="my-6 text-center text-gray-500">— or continue with —</div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleOAuth("google")}
            className="p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleOAuth("github")}
            className="p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <img src="/github-icon.svg" alt="GitHub" className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleOAuth("twitter")}
            className="p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <img src="/twitter-icon.svg" alt="Twitter" className="w-6 h-6" />
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-pulse font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
