import { Link } from "react-router-dom";
import { EMICalculator } from "../../components/calculators/EMICalculator";
import { FinancialDisclaimer } from "../../components/common/FinancialDisclaimer";
import { ChevronLeft } from "lucide-react";

export function EMI() {
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
          EMI Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Calculate your Equated Monthly Installment (EMI) for home, car, or
          personal loans.
        </p>
      </div>

      <EMICalculator />

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          How is EMI Calculated?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          The mathematical formula used to calculate EMI is:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg inline-block mb-4 font-mono text-slate-800 dark:text-slate-200">
          E = P × r × (1 + r)^n / ((1 + r)^(n - 1))
        </div>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
          <li>
            <strong>E</strong> is the EMI amount
          </li>
          <li>
            <strong>P</strong> is the Principal Loan Amount
          </li>
          <li>
            <strong>r</strong> is the monthly interest rate (annual rate divided
            by 12 and expressed as a decimal)
          </li>
          <li>
            <strong>n</strong> is the loan duration in months
          </li>
        </ul>
      </div>

      <FinancialDisclaimer />
    </div>
  );
}
