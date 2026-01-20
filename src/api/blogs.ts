import { type Blog } from "@/types/blog";

// GET — Fetch All Blogs

const BASE_URL = "http://localhost:3001";
export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${BASE_URL}/blogs`);

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

// GET — Fetch Blog by ID
export const getBlogbyId = async (id: number): Promise<Blog> => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
};

// POST — Create New Blog
export const createBlog = async (blog: Omit<Blog, "id">): Promise<Blog> => {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    throw new Error("Failed to create blog");
  }

  return res.json();
};
