import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  title: string;
}

interface UserProfile {
  full_name?: string;
  username?: string;
  email?: string;
}

function Topbar({ title }: TopbarProps) {
  const [userName, setUserName] = useState<string>("User");
  const [email, setEmail] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, username")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserName(profile.full_name || profile.username || "User");
        } else {
          const emailPrefix = user.email?.split("@")[0] || "User";
          setUserName(emailPrefix);
        }

        setEmail(user.email || "");
      }
    };

    fetchUserProfile();
  }, []);

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  // 🧭 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative">
      <h1 className="text-xl font-bold text-pulse">{title}</h1>

      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="font-medium hidden sm:block">{userName}</span>
          <div className="w-10 h-10 rounded-full bg-pulse flex items-center justify-center text-white font-semibold">
            {userInitial}
          </div>
        </div>

        {menuOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border p-2 z-50">
            <div className="px-3 py-2 border-b">
              <p className="font-semibold text-gray-800 truncate">{userName}</p>
              <p className="text-sm text-gray-500 truncate">{email}</p>
            </div>
            <ul className="mt-2 space-y-1">
              <li
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                🧑‍💻 My Profile
              </li>
              <li
                onClick={() => {
                  navigate("/settings");
                  setMenuOpen(false);
                }}
                className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                ⚙️ Settings
              </li>
              <li
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer transition"
              >
                🚪 Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
