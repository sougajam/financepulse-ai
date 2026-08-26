import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { Clock, User } from "lucide-react";
import type { Article } from "../types";

export function Economy() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles`,
        );
        const data = await response.json();

        // SMART FILTER: Catches macroeconomics or economy
        const filtered = data.filter((article: Article) => {
          if (!article.category) return false;
          const cat = article.category.toLowerCase().trim();
          return cat === "macroeconomics" || cat === "economy";
        });

        setArticles(filtered);
      } catch (err) {
        console.error("Error loading articles:", err);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Economy & Macroeconomics
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          Deep dives into the macroeconomic shifts driving the world.
        </p>
      </div>
      {articles.length === 0 ? (
        <p className="text-slate-500">No economy articles published yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="block h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
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
      )}
    </div>
  );
}
