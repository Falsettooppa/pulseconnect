import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import PostCard from "../components/PostCard"

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <PostCard author="Jane Doe" content="Just joined PulseConnect 🎉" />
          <PostCard author="John Smith" content="Loving this dashboard 😍" />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
