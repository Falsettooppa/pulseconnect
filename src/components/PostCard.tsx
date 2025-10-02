type PostCardProps = {
  author: string
  content: string
}

function PostCard({ author, content }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="font-semibold mb-1">{author}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  )
}

export default PostCard
