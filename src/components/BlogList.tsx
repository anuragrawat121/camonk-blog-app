import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlogs, deleteBlog } from "@/api/blogs";
import { type Blog } from "@/types/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  GraduationCap,
  Scale,
  FileText,
  type LucideIcon,
  DollarSign,
  Heart,
  Monitor,
  Trash2,
} from "lucide-react";

interface BlogListProps {
  onSelect: (id: number) => void;
  selectedId: number | null;
}

const getCategoryIcon = (categories: string[]): LucideIcon => {
  const mainCategory = categories?.[0]?.toUpperCase();
  switch (mainCategory) {
    case "FINANCE":
      return DollarSign;
    case "TECH":
      return Monitor;
    case "CAREER":
      return Briefcase;
    case "EDUCATION":
      return GraduationCap;
    case "REGULATIONS":
      return Scale;
    case "LIFESTYLE":
      return Heart;
    default:
      return FileText;
  }
};

function BlogList({ onSelect, selectedId }: BlogListProps) {
  const queryClient = useQueryClient();

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      // If the deleted blog was selected, deselect it (optional, but good UX)
      // Since we don't control selectedId state here, we can't directly nullify it easily
      // without passing a setter, but fixing the list is the priority.
    },
  });

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent card selection
    if (confirm("Are you sure you want to delete this article?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-xl bg-gray-100 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {blogs?.map((blog) => {
        const Icon = getCategoryIcon(blog.category);
        return (
          <Card
            key={blog.id}
            onClick={() => onSelect(blog.id)}
            className={`group cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md border shadow-sm ${
              selectedId === blog.id
                ? "border-l-4 border-l-blue-600 border-y-gray-100 border-r-gray-100 bg-blue-50/50"
                : "border-gray-100 hover:-translate-y-1"
            }`}
          >
            <CardHeader className="p-4 pb-2">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {blog.category?.map((cat) => (
                  <span
                    key={cat}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedId === blog.id
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    selectedId === blog.id
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <CardTitle
                  className={`text-lg font-bold line-clamp-2 ${
                    selectedId === blog.id
                      ? "text-blue-700"
                      : "text-gray-900 group-hover:text-blue-600"
                  }`}
                >
                  {blog.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 py-0 pl-[4.25rem]">
              <CardDescription className="line-clamp-2 text-sm text-gray-600">
                {blog.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-3 pl-[4.25rem] text-xs text-gray-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <time dateTime={blog.date}>
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>5 min read</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                onClick={(e) => handleDelete(e, blog.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default BlogList;
