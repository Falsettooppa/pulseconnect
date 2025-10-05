import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

const Messages = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Messages" />
        <main className="p-6">
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-2">Messages</h2>
            <p>This area will display chats or notifications soon.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Messages
