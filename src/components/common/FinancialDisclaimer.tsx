import { AlertTriangle } from "lucide-react";

export function FinancialDisclaimer() {
  return (
    <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 my-8 flex gap-3">
      <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 shrink-0" />
      <p className="text-sm text-slate-600 dark:text-slate-300">
        <strong>Disclaimer:</strong> FinancePulse AI provides financial and
        economic information for educational and informational purposes only.
        Nothing on this website constitutes personalized financial, investment,
        tax or legal advice. Financial markets involve risk, and past
        performance does not guarantee future results.
      </p>
    </div>
  );
}
