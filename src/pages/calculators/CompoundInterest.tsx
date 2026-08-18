import { Link } from "react-router-dom";
import { CompoundInterestCalculator } from "../../components/calculators/CompoundInterestCalculator";
import { FinancialDisclaimer } from "../../components/common/FinancialDisclaimer";
import { ChevronLeft } from "lucide-react";

export function CompoundInterest() {
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
          Compound Interest Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          See how your money grows exponentially over time with the power of
          compounding.
        </p>
      </div>

      <CompoundInterestCalculator />

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          The Math Behind Compounding
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Compound interest is calculated on the initial principal, which also
          includes all of the accumulated interest from previous periods. The
          standard formula is:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg inline-block mb-4 font-mono text-slate-800 dark:text-slate-200">
          {"A = P \\left(1 + \\frac{r}{n}\\right)^{nt}"}
        </div>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
          <li>
            <strong>A</strong> is the final amount
          </li>
          <li>
            <strong>P</strong> is the principal (initial investment)
          </li>
          <li>
            <strong>r</strong> is the annual interest rate (in decimal)
          </li>
          <li>
            <strong>n</strong> is the number of times interest is compounded per
            year
          </li>
          <li>
            <strong>t</strong> is the time the money is invested for in years
          </li>
        </ul>
      </div>

      <FinancialDisclaimer />
    </div>
  );
}
