import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Settings" />
        <main className="p-6">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">App Settings</h2>

            <div className="space-y-6">
              {/* Theme Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-2">Appearance</h3>
                <p className="text-gray-500 text-sm mb-3">
                  Switch between Light and Dark mode.
                </p>
                <div className="flex items-center gap-4">
                  <button className="bg-pulse text-white px-4 py-2 rounded hover:bg-pulse/80 transition">
                    Light Mode
                  </button>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                    Dark Mode
                  </button>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-2">Notifications</h3>
                <p className="text-gray-500 text-sm mb-3">
                  Manage how you receive updates from PulseConnect.
                </p>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 accent-pulse" defaultChecked />
                  <span>Email Notifications</span>
                </label>
                <label className="flex items-center gap-3 mt-2">
                  <input type="checkbox" className="w-5 h-5 accent-pulse" />
                  <span>Push Notifications</span>
                </label>
              </div>

              {/* Account Section */}
              <div>
                <h3 className="text-lg font-medium mb-2">Account</h3>
                <p className="text-gray-500 text-sm mb-3">
                  Manage your account settings and security.
                </p>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
