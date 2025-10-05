import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PostCard, { Post } from "../components/PostCard";

type Comment = { id: string; author: string; text: string };

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "p1",
      author: "Jane Doe",
      content: "Just joined PulseConnect 🎉",
      likes: 2,
      comments: [{ id: "c1", author: "John", text: "Welcome!" }],
    },
    {
      id: "p2",
      author: "John Smith",
      content: "Loving this dashboard 😍",
      likes: 1,
      comments: [],
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    const text = newPost.trim();
    if (!text) return;
    const p: Post = {
      id: "p" + Date.now().toString(),
      author: "You",
      content: text,
      likes: 0,
      comments: [],
    };
    setPosts((prev) => [p, ...prev]);
    setNewPost("");
  };

  const handleLike = (id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleAddComment = (id: string, text: string) => {
    const comment: Comment = { id: "c" + Date.now().toString(), author: "You", text };
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, comments: [...p.comments, comment] } : p)));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex gap-2">
              <button onClick={handlePost} className="bg-pulse text-white px-4 py-2 rounded hover:bg-pulse/80">
                Post
              </button>
              <button onClick={() => setNewPost("")} className="px-4 py-2 border rounded">
                Cancel
              </button>
            </div>
          </div>

          {posts.map((p) => (
            <PostCard key={p.id} post={p} onLike={handleLike} onAddComment={handleAddComment} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
