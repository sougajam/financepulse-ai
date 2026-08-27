import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { Clock, User } from "lucide-react";
import type { Article } from "../types";
import { MarketTicker } from "../components/common/MarketTicker";

// ADDED: The import for the Wealth Calculator
// (If you saved it inside the "common" folder, change this to "../components/common/WealthCalculator")
import { WealthCalculator } from "../components/common/WealthCalculator";

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles from our Node.js backend when the page loads
  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        console.log("My Live API URL is:", import.meta.env.VITE_API_URL);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles`,
        );
        if (!response.ok) throw new Error("Failed to fetch articles");

        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error("Error loading articles:", err);
        setError("Could not load articles. Is the backend running?");
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-rose-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Financial Intelligence
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-8">
          Deep dives, market analysis, and educational guides to help you master
          your wealth.
        </p>

        {/* ADDED: Both widgets placed directly below the header text */}
        <MarketTicker />
        <WealthCalculator />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.slug}`}
            className="block h-full"
          >
            <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              {/* --- IMAGE BLOCK START --- */}
              {article.imageUrl && (
                <div className="w-full h-48 overflow-hidden rounded-t-xl border-b border-slate-100 dark:border-slate-800">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              {/* --- IMAGE BLOCK END --- */}
              <div className="p-6 flex flex-col h-full">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4 self-start">
                  {article.category}
                </span>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flex-grow">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <User className="h-4 w-4 mr-2" />
                    {article.author}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Clock className="h-4 w-4 mr-2" />
                    {article.readingTime}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
