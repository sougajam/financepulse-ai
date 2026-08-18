import { Link } from "react-router-dom";
import { FIRECalculator } from "../../components/calculators/FIRECalculator";
import { FinancialDisclaimer } from "../../components/common/FinancialDisclaimer";
import { ChevronLeft } from "lucide-react";

export function FIRE() {
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
          FIRE Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Financial Independence, Retire Early. Check if your current savings
          rate will allow you to retire when you want.
        </p>
      </div>

      <FIRECalculator />

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          The Rule of 25
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          The FIRE movement relies heavily on the "Rule of 25". This rule states
          that you need 25 times your annual expenses invested in order to
          retire safely. This assumes you will withdraw 4% of your portfolio in
          your first year of retirement, adjusting for inflation in subsequent
          years.
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg inline-block mb-4 font-mono text-slate-800 dark:text-slate-200">
          Target Corpus = Annual Post-Retirement Expenses $\times$ 25
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Our calculator automatically adjusts your current annual expenses for
          inflation to determine what your expenses will realistically be at
          your target retirement age.
        </p>
      </div>

      <FinancialDisclaimer />
    </div>
  );
}
