import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Clock, User, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Article } from "../types";

export function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSingleArticle() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${slug}`,
        );

        if (!response.ok) {
          if (response.status === 404) throw new Error("Article not found");
          throw new Error("Failed to fetch article");
        }

        const data = await response.json();
        setArticle(data);
      } catch (err: any) {
        console.error("Error loading article:", err);
        setError(err.message || "Could not load the article.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSingleArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          {error || "Article not found"}
        </h1>
        <Link to="/articles" className="text-emerald-600 hover:underline">
          Return to Articles
        </Link>
      </div>
    );
  }

  // Format the raw PostgreSQL date string nicely
  const formattedDate = new Date(article.publishedDate).toLocaleDateString(
    "en-IN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 mb-8"
        to="/articles"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to all articles
      </Link>

      <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10">
        <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {article.readingTime}
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert prose-emerald max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
