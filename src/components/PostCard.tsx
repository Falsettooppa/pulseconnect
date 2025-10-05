import React, { useState } from "react";

export type Comment = { id: string; author: string; text: string };

export type Post = {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: Comment[];
};

type PostCardProps = {
  post: Post;
  onLike: (id: string) => void;
  onAddComment: (id: string, text: string) => void;
};

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const submitComment = () => {
    const t = commentText.trim();
    if (!t) return;
    onAddComment(post.id, t);
    setCommentText("");
    setShowComments(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-pulse flex items-center justify-center text-white font-semibold">
          {post.author?.charAt(0) ?? "U"}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold mb-1">{post.author}</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
              aria-label={`Like post by ${post.author}`}
            >
              <span>❤️</span>
              <span>{post.likes}</span>
            </button>

            <button
              onClick={() => setShowComments((s) => !s)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              aria-expanded={showComments}
              aria-label={`Toggle comments for post by ${post.author}`}
            >
              <span>💬</span>
              <span>{post.comments.length}</span>
            </button>
          </div>

          {showComments && (
            <div className="mt-3">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {post.comments.length === 0 && (
                  <div className="text-sm text-gray-500">No comments yet</div>
                )}
                {post.comments.map((c) => (
                  <div key={c.id} className="text-sm bg-gray-50 p-2 rounded">
                    <strong className="mr-2">{c.author}:</strong>
                    <span>{c.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex gap-2">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={submitComment}
                  className="bg-pulse text-white px-3 py-2 rounded hover:bg-pulse/80"
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
