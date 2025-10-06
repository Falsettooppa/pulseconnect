import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Theophilus Promise",
    email: "theo@pulseconnect.com",
    bio: "Building PulseConnect – connecting voices, one pulse at a time.",
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Profile" />
        <main className="p-6">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 text-gray-700">
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://i.pravatar.cc/120"
                alt="User Avatar"
                className="w-24 h-24 rounded-full mb-3"
              />
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            {editing ? (
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pulse focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pulse focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pulse focus:outline-none"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="mt-4 bg-pulse text-white px-4 py-2 rounded-lg hover:bg-pulse-dark transition"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="mt-4 italic text-gray-600">{user.bio}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-6 bg-pulse text-white px-5 py-2 rounded-lg hover:bg-pulse-dark transition"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
