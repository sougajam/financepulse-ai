import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import { FinancialDisclaimer } from "../components/common/FinancialDisclaimer";
import { Calendar, Clock, User, ChevronLeft } from "lucide-react";
import { marked } from "marked";

export function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Find the specific article matching the URL slug
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Article Not Found
        </h1>
        <Link className="text-emerald-600 hover:underline" to="/articles">
          Return to Articles
        </Link>
      </div>
    );
  }

  // Convert markdown to HTML safely using 'marked' library we installed in MS1
  const htmlContent = marked.parse(article.content);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Breadcrumb */}
      <Link
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 mb-6"
        to="/articles"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Articles
      </Link>

      <article>
        <header className="mb-8">
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-slate-500 dark:text-slate-400 gap-4">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" /> {article.author}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> {article.publishedDate}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" /> {article.readingTime}
            </span>
          </div>
        </header>

        {/* Article Content rendered from Markdown */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none prose-emerald"
          dangerouslySetInnerHTML={{ __html: htmlContent as string }}
        />

        {/* Tags */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <FinancialDisclaimer />
      </article>
    </div>
  );
}
