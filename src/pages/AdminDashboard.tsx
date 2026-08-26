import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import type { Article } from "../types";

export function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles`,
      );
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this article? This cannot be undone.",
    );

    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        // Instantly remove it from the screen without refreshing the page
        setArticles(articles.filter((article) => article.id !== id));
      } else {
        alert("Failed to delete the article from the database.");
      }
    } catch (err) {
      console.error("Error deleting article:", err);
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <Link
          to="/admin/create"
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Article
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Title
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Category
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {articles.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No articles published yet.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {article.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <Link
                        to={`/admin/edit/${article.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id!)}
                        className="inline-flex items-center text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
