function Sidebar() {
  return (
    <aside className="w-64 bg-pulse text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">PulseConnect</h2>
      <nav className="flex flex-col gap-3">
        <a href="#" className="hover:bg-pulse/80 p-2 rounded">🏠 Home</a>
        <a href="#" className="hover:bg-pulse/80 p-2 rounded">👥 Friends</a>
        <a href="#" className="hover:bg-pulse/80 p-2 rounded">💬 Messages</a>
        <a href="#" className="hover:bg-pulse/80 p-2 rounded">⚙️ Settings</a>
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
