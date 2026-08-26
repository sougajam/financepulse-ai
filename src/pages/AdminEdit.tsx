import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function AdminEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State for all form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Macroeconomics");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch the existing article data when the page loads
  useEffect(() => {
    async function fetchArticleData() {
      try {
        // Fetch all articles, then find the specific one by ID
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles`,
        );
        const data = await response.json();

        const currentArticle = data.find((a: any) => a.id === parseInt(id!));

        if (currentArticle) {
          setTitle(currentArticle.title);
          setCategory(currentArticle.category || "Macroeconomics");
          setExcerpt(currentArticle.excerpt || "");
          setContent(currentArticle.content || "");
          setAuthor(currentArticle.author || "");
          setReadingTime(currentArticle.readingTime || "");
          setImageUrl(currentArticle.imageUrl || "");
        } else {
          alert("Article not found!");
          navigate("/admin");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticleData();
  }, [id, navigate]);

  // 2. Handle the PUT request to update the database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            category,
            excerpt,
            content,
            author,
            readingTime,
            imageUrl,
          }),
        },
      );

      if (response.ok) {
        // Send the user back to the admin dashboard after a successful save
        navigate("/admin");
      } else {
        alert("Failed to update article.");
      }
    } catch (err) {
      console.error("Error updating article:", err);
      alert("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Edit Article
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="Macroeconomics">Macroeconomics</option>
              <option value="Personal Finance">Personal Finance</option>
              <option value="Investing">Investing</option>
              <option value="Tech & Wealth">Tech & Wealth</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Author Name
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Est. Reading Time
            </label>
            <input
              type="text"
              required
              value={readingTime}
              placeholder="e.g., 5 min read"
              onChange={(e) => setReadingTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Short Excerpt
          </label>
          <textarea
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Full Content (Markdown Supported)
          </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
