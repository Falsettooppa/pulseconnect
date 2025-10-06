import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Messages() {
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-pulse">Messages</h2>
          <div className="bg-white rounded-lg shadow p-6 text-gray-600">
            <p>This is where your private messages and chat list will appear 💬</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Messages;