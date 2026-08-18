import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import { articles } from "../data/articles";
import { Calendar, Clock, ChevronRight } from "lucide-react";

export function Articles() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Financial Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Educational articles to help you understand markets, economics, and
          personal finance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card
            className="flex flex-col h-full hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
            key={article.id}
          >
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                {article.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {article.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">
                {article.excerpt}
              </p>

              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4 space-x-4">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> {article.publishedDate}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {article.readingTime}
                </span>
              </div>

              <Link
                className="mt-auto inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                to={`/articles/${article.slug}`}
              >
                Read Article <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
