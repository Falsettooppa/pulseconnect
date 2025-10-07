import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

interface ProfileData {
  id: string;
  full_name: string;
  username: string;
  bio: string;
  avatar_url: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not found:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
        setAvatarPreview(data.avatar_url);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // ✅ Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file || !profile) return;

      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}_${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      setAvatarPreview(publicUrl);
      setProfile({ ...profile, avatar_url: publicUrl });
      alert("Avatar updated successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle text updates
  const handleUpdate = async () => {
    if (!profile) return;
    setUpdating(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        username: profile.username,
        bio: profile.bio,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    setUpdating(false);

    if (error) {
      alert("Failed to update profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Profile" />
        <main className="p-8">
          <div className="bg-white rounded-2xl shadow p-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-center text-pulse mb-6">
              My Profile
            </h2>

            {profile ? (
              <div className="space-y-6">
                {/* ✅ Avatar Upload Section */}
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={avatarPreview || "/default-avatar.png"}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border object-cover"
                  />
                  <label className="cursor-pointer text-sm text-pulse hover:underline">
                    {uploading ? "Uploading..." : "Change Avatar"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={profile.full_name || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, full_name: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/50"
                />

                <input
                  type="text"
                  placeholder="Username"
                  value={profile.username || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/50"
                />

                <textarea
                  placeholder="Bio"
                  value={profile.bio || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse/50"
                />

                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="w-full bg-pulse text-white py-3 rounded-lg hover:bg-pulse/90 transition"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No profile found. Please sign up again.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
