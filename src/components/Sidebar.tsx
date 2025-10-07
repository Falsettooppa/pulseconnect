import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login") // Redirect to login page after logout
  }

  return (
    <aside className="w-64 bg-pulse text-white flex flex-col p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">PulseConnect</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="hover:bg-pulse/80 p-2 rounded flex items-center gap-2">
          <span>🏠</span> Home
        </Link>
        <Link to="/profile" className="hover:bg-pulse/80 p-2 rounded flex items-center gap-2">
          <span>👤</span> Profile
        </Link>
        <Link to="/messages" className="hover:bg-pulse/80 p-2 rounded flex items-center gap-2">
          <span>💬</span> Messages
        </Link>
        <Link to="/settings" className="hover:bg-pulse/80 p-2 rounded flex items-center gap-2">
          <span>⚙️</span> Settings
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-white text-pulse font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
