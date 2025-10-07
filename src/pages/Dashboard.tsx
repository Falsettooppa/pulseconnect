import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PostCard, { type Post } from "../components/PostCard";
import { supabase } from "../lib/supabaseClient";

type Comment = { id: string; author: string; text: string };

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch posts initially
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // ✅ Realtime listener for new posts
  useEffect(() => {
    const channel = supabase
      .channel("realtime:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          console.log("New post received:", payload.new);
          const newPost: Post = {
            id: payload.new.id,
            author: payload.new.user_id || "Anonymous",
            content: payload.new.content,
            likes: 0,
            comments: [],
          };
          setPosts((prev) => [newPost, ...prev]);
        }
      )
      .subscribe();

    // Cleanup listener on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✅ Handle creating new post
  const handlePost = async () => {
    const text = newPost.trim();
    if (!text) return;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    const newPostData = {
      user_id: user?.id || "anonymous",
      content: text,
    };

    const { error } = await supabase.from("posts").insert([newPostData]);

    if (error) {
      console.error("Error creating post:", error.message);
      alert("Failed to post.");
    } else {
      setNewPost("");
    }
  };

  // ✅ Local interactions
  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleAddComment = (id: string, text: string) => {
    const comment: Comment = {
      id: "c" + Date.now().toString(),
      author: "You",
      text,
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={handlePost}
                  className="bg-pulse text-white px-4 py-2 rounded hover:bg-pulse/80"
                >
                  Post
                </button>
                <button
                  onClick={() => setNewPost("")}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
              </div>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-500">
                No posts yet. Be the first to post something!
              </p>
            ) : (
              posts.map((p) => (
                <PostCard
                  key={p.id}
                  post={p}
                  onLike={handleLike}
                  onAddComment={handleAddComment}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
