import { UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state updated with imageUrl
  const [formData, setFormData] = useState({
    title: "",
    category: "Personal Finance",
    excerpt: "",
    content: "",
    author: "FinancePulse Team",
    readingTime: "5 min read",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to publish article");

      const newArticle = await response.json();
      // Redirect the user straight to their newly published article!
      navigate(`/articles/${newArticle.slug}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Cleaned up header section */}
      <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create New Article
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Publish a new post directly to the database.
          </p>
        </div>
        {/* This renders your Google profile picture and a dropdown menu */}
        <UserButton afterSignOutUrl="/articles" />
      </div>

      {error && (
        <div className="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Article Title
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g., Mastering the MERN Stack"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option>Personal Finance</option>
              <option>Investing</option>
              <option>Macroeconomics</option>
              <option>Tech & Wealth</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Author
            </label>
            <input
              required
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Estimated Reading Time
            </label>
            <input
              required
              type="text"
              name="readingTime"
              value={formData.readingTime}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g., 6 min read"
            />
          </div>
        </div>

        {/* Added Cover Image URL Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Cover Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Short Excerpt (Shows on the card)
          </label>
          <textarea
            required
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="A quick summary of the article..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Full Content (Supports Markdown)
          </label>
          <textarea
            required
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm"
            placeholder="# Your heading here..."
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
        >
          {isLoading ? "Publishing..." : "Publish Article"}
        </button>
      </form>
    </div>
  );
}
