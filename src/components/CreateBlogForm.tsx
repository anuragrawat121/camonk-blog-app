import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs";
import { type Blog } from "@/types/blog";
import { Button } from "@/components/ui/button";

function CreateBlogForm() {
  const [form, setForm] = useState<Omit<Blog, "id">>({
    title: "",
    description: "",
    content: "",
    category: [],
    coverImage: "",
    date: new Date().toISOString(),
  });

  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setForm({
        // Reset form
        title: "",
        description: "",
        content: "",
        category: [],
        coverImage: "",
        date: new Date().toISOString(),
      });
      setError("");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (error) setError(""); // Clear error on change
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.content.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    mutation.mutate({
      ...form,
      date: new Date().toISOString(),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className=" mt-12  space-y-4 rounded-xl bg-white p-6 shadow-sm border border-gray-100"
    >
      <h2 className="text-lg font-bold text-gray-900">Create New Blog</h2>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {mutation.isPending && (
        <div className="text-sm text-blue-600">Creating blog...</div>
      )}
      {mutation.isError && (
        <div className="text-sm text-red-600">Failed to create blog.</div>
      )}

      <div className="space-y-4">
        <input
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none"
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Short description"
          onChange={handleChange}
          rows={2}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none"
        />

        <textarea
          name="content"
          value={form.content}
          placeholder="Content"
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none"
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95"
          >
            Create Blog
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateBlogForm;
