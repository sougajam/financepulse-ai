import { Link } from "react-router-dom";
import { NetWorthCalculator } from "../../components/calculators/NetWorthCalculator";
import { FinancialDisclaimer } from "../../components/common/FinancialDisclaimer";
import { ChevronLeft } from "lucide-react";

export function NetWorth() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 mb-6"
        to="/calculators"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Calculators
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Net Worth Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Calculate your true financial standing by subtracting what you owe
          from what you own.
        </p>
      </div>

      <NetWorthCalculator />

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          What is Net Worth?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Net worth is the most accurate measure of your personal wealth. It is
          simply the total value of everything you own (Assets) minus everything
          you owe (Liabilities).
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg inline-block mb-4 font-mono text-slate-800 dark:text-slate-200">
          Net Worth = Total Assets - Total Liabilities
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          A positive net worth means your assets exceed your liabilities. A
          negative net worth (which is common for recent graduates with student
          loans) means you owe more than you own. The goal of financial planning
          is to steadily increase your net worth over time.
        </p>
      </div>

      <FinancialDisclaimer />
    </div>
  );
}
