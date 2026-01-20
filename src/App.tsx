import BlogList from "@/components/BlogList";
import BlogDetail from "@/components/BlogDetail";
import CreateBlogForm from "@/components/CreateBlogForm";
import Navbar from "@/components/Navbar";
import BlogHeader from "@/components/BlogHeader";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { type Blog } from "@/types/blog";

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  // Fetch blogs to auto-select the first one
  const { data: blogs } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  // Auto-select the first blog when blogs are loaded
  useEffect(() => {
    if (blogs && blogs.length > 0 && selectedBlogId === null) {
      setSelectedBlogId(blogs[0].id);
    }
  }, [blogs, selectedBlogId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <BlogHeader />
      <div className="max-w-screen-2xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column: Blog List - Shows second on mobile, first on desktop */}
        <div className="flex flex-col gap-6 lg:w-[500px] shrink-0 order-2 lg:order-1">
          <div className="flex-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-4">
              Latest Articles
            </h2>
            <BlogList
              onSelect={setSelectedBlogId}
              selectedId={selectedBlogId}
            />
          </div>
          <CreateBlogForm />
        </div>
        {/* Right Column: Blog Detail - Shows first on mobile, second on desktop */}
        <div className="flex-1 min-w-0 order-1 lg:order-2">
          <BlogDetail blogId={selectedBlogId} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
