import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Profile" />
        <main className="p-6">
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-2">Profile Page</h2>
            <p>This section will show user profile details later.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile
