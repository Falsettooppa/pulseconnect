import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="w-64 bg-pulse text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">PulseConnect</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:bg-pulse/80 p-2 rounded">🏠 Home</Link>
        <Link to="/profile" className="hover:bg-pulse/80 p-2 rounded">👤 Profile</Link>
        <Link to="/messages" className="hover:bg-pulse/80 p-2 rounded">💬 Messages</Link>
        <Link to="/settings" className="hover:bg-pulse/80 p-2 rounded">⚙️ Settings</Link>
      </nav>
      <div className="mt-auto">
        <button className="w-full bg-white text-pulse font-semibold py-2 rounded hover:bg-gray-200">
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
