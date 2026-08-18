import { Link } from "react-router-dom";
import { InflationCalculator } from "../../components/calculators/InflationCalculator";
import { FinancialDisclaimer } from "../../components/common/FinancialDisclaimer";
import { ChevronLeft } from "lucide-react";

export function Inflation() {
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
          Inflation Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Calculate how much more money you will need in the future just to
          maintain your current purchasing power.
        </p>
      </div>

      <InflationCalculator />

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          The Impact of the "Silent Tax"
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Inflation erodes the purchasing power of your money over time. If a
          lifestyle costs ₹1,00,000 today, and inflation averages 6% per year,
          you will need significantly more money in the future just to buy the
          exact same things.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          This is why leaving long-term savings in a low-interest bank account
          or cash often results in a hidden loss of wealth.
        </p>
      </div>

      <FinancialDisclaimer />
    </div>
  );
}
