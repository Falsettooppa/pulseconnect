import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

interface Post {
  id: string
  title: string
  content: string
  created_at: string
}

export default function PostsFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching posts:", error)
      } else {
        // Shuffle to simulate random posts
        const shuffled = data.sort(() => 0.5 - Math.random())
        setPosts(shuffled.slice(0, 5)) // show 5 random posts
      }

      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading) return <p className="text-center mt-4">Loading posts...</p>

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-pulse mb-4">Latest Posts</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
            <span className="text-xs text-gray-400 block mt-2">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
