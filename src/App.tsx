function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-pulse">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="font-medium">User</span>
            <div className="w-10 h-10 rounded-full bg-pulse flex items-center justify-center text-white">
              U
            </div>
          </div>
        </header>

        {/* Feed */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-bold text-lg mb-2">Welcome back!</h2>
            <p className="text-gray-600">This is your social feed. 🚀</p>
          </div>

          {/* Example Post */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-1">Jane Doe</h3>
            <p className="text-gray-700">Just joined PulseConnect 🎉</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
