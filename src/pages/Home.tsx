import { Link } from "react-router-dom";
import { MarketSnapshot } from "../components/markets/MarketSnapshot";
import { Card } from "../components/common/Card";
import { Calculator, BookOpen, BrainCircuit } from "lucide-react";

export function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="py-12 md:py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Understand Money, Markets & the Economy With{" "}
          <span className="text-emerald-600 dark:text-emerald-500">AI</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          Financial insights, economic explainers, smart calculators and
          AI-powered tools designed to make complex financial information easier
          to understand.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/calculators"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Explore Tools
          </Link>
          <Link
            to="/articles"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            Read Insights
          </Link>
        </div>
      </div>

      {/* Market Snapshot - Mobile Responsive Wrapper Added */}
      <div className="w-full overflow-hidden mb-12">
        <MarketSnapshot />
      </div>

      {/* Features Grid */}
      <section className="py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <Calculator className="h-10 w-10 text-emerald-600 dark:text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Smart Calculators
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Plan your SIPs, calculate EMIs, or project your FIRE number with
              our suite of free tools.
            </p>
            <Link
              to="/calculators"
              className="text-emerald-600 dark:text-emerald-500 font-medium hover:underline"
            >
              View Calculators &rarr;
            </Link>
          </Card>

          <Card className="p-6">
            <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Economic Insights
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Understand macroeconomic trends, inflation, and how central banks
              affect your wallet.
            </p>
            <Link
              to="/economy"
              className="text-emerald-600 dark:text-emerald-500 font-medium hover:underline"
            >
              Read Articles &rarr;
            </Link>
          </Card>

          <Card className="p-6 border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10">
            <BrainCircuit className="h-10 w-10 text-emerald-600 dark:text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              AI Explainers
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Ask complex financial questions and get jargon-free explanations
              powered by AI.
            </p>
            <span className="inline-flex items-center text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-full">
              Coming Soon
            </span>
          </Card>
        </div>
      </section>
    </div>
  );
}
