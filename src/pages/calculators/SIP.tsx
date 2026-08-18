import { Link } from "react-router-dom";
import { SIPCalculator } from "../../components/calculators/SIPCalculator";
import { FinancialDisclaimer } from "../../components/common/FinancialDisclaimer";
import { ChevronLeft } from "lucide-react";

export function SIP() {
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
          SIP Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Calculate the future value of your monthly investments through the
          power of compounding.
        </p>
      </div>

      <SIPCalculator />

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          How does a SIP work?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          A Systematic Investment Plan (SIP) allows you to invest a fixed amount
          regularly in mutual funds. It helps average out market volatility
          (Rupee Cost Averaging) and builds wealth over the long term through
          compound interest.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          <strong>Note:</strong> The returns displayed are estimated
          projections. Real market returns fluctuate.
        </p>
      </div>

      <FinancialDisclaimer />
    </div>
  );
}
