import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogbyId } from "@/api/blogs";
import { type Blog } from "@/types/blog";

import { Button } from "@/components/ui/button";
import { Share2, Heart, MessageCircle, Send } from "lucide-react";

interface BlogDetailProps {
  blogId: number | null;
}

function BlogDetail({ blogId }: BlogDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "User 1",
      text: "This is a great article! Really helpful insights on this topic. Thanks for sharing your knowledge with the community.",
      timestamp: "2 hours ago",
      likes: 5,
    },
    {
      id: 2,
      user: "User 2",
      text: "This is a great article! Really helpful insights on this topic. Thanks for sharing your knowledge with the community.",
      timestamp: "2 hours ago",
      likes: 5,
    },
  ]);

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery<Blog>({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogbyId(blogId as number),
    enabled: !!blogId,
  });

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: `User ${comments.length + 1}`,
        text: commentText,
        timestamp: "Just now",
        likes: 0,
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  if (isLoading || !blogId) {
    return <div className="h-96 animate-pulse rounded-xl bg-gray-100"></div>;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        Error loading article: {(error as Error).message}
      </div>
    );
  }

  return (
    <article className="rounded-2xl bg-white shadow-sm border border-gray-100 h-full overflow-hidden">
      {/* Featured Image - Full Width */}
      {blog?.coverImage && (
        <div className="w-full h-80 overflow-hidden bg-gray-100">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}

      {/* Content Container */}
      <div className="p-8">
        {/* Header */}
        <header className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {blog?.category.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {blog?.title}
          </h1>

          {/* Share Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="gap-2 rounded-full active:scale-95 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Share2 className="h-4 w-4" />
              Share this article
            </Button>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-100 pb-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                CA
              </div>
              <span className="font-medium text-gray-900">CA Monk Team</span>
            </div>
            <span>•</span>
            <time dateTime={blog?.date}>
              {blog?.date &&
                new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </time>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-blue max-w-none text-gray-600 space-y-4 leading-loose">
          {blog?.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-lg text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Engagement Section */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`gap-2 ${
                isLiked
                  ? "text-red-600 hover:text-red-700"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              <span className="font-medium">{likeCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-gray-600 hover:text-blue-600"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{comments.length} Comments</span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Comments</h3>

          {/* Comment Input */}
          <div className="space-y-3">
            <textarea
              placeholder="Share your thoughts..."
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleCommentSubmit}
                className="gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95"
              >
                <Send className="h-4 w-4" />
                Post Comment
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">
                  U{comment.id}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">
                      {comment.user}
                    </span>
                    <span className="text-xs text-gray-400">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button className="hover:text-blue-600 font-medium">
                      Reply
                    </button>
                    <button className="hover:text-red-600 font-medium flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogDetail;
