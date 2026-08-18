import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function NetWorthCalculator() {
  // Assets
  const [cash, setCash] = useState<number>(50000);
  const [investments, setInvestments] = useState<number>(200000);
  const [property, setProperty] = useState<number>(1500000);
  const [otherAssets, setOtherAssets] = useState<number>(50000);

  // Liabilities
  const [homeLoan, setHomeLoan] = useState<number>(800000);
  const [personalLoan, setPersonalLoan] = useState<number>(50000);
  const [creditCard, setCreditCard] = useState<number>(10000);
  const [otherDebt, setOtherDebt] = useState<number>(0);

  const results = useMemo(() => {
    const totalAssets = cash + investments + property + otherAssets;
    const totalLiabilities = homeLoan + personalLoan + creditCard + otherDebt;
    const netWorth = totalAssets - totalLiabilities;

    const chartData = [
      { name: "Total Assets", value: totalAssets },
      { name: "Total Liabilities", value: totalLiabilities },
    ];

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      chartData,
    };
  }, [
    cash,
    investments,
    property,
    otherAssets,
    homeLoan,
    personalLoan,
    creditCard,
    otherDebt,
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const COLORS = ["#10b981", "#f43f5e"]; // Emerald for Assets, Rose for Liabilities

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Top Summary Section */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              Total Assets
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(results.totalAssets)}
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-x border-slate-200 dark:border-slate-700 py-4 md:py-0">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              Total Liabilities
            </p>
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              {formatCurrency(results.totalLiabilities)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              Your Net Worth
            </p>
            <p
              className={`text-3xl font-bold ${results.netWorth >= 0 ? "text-blue-600 dark:text-blue-400" : "text-rose-600 dark:text-rose-400"}`}
            >
              {formatCurrency(results.netWorth)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Input Section */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-500 mb-4 flex items-center">
            Assets (What you own)
          </h3>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Cash & Bank Balance
              </label>
              <input
                type="number"
                value={cash}
                onChange={(e) => setCash(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Investments (Stocks, Mutual Funds)
              </label>
              <input
                type="number"
                value={investments}
                onChange={(e) => setInvestments(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Real Estate / Property
              </label>
              <input
                type="number"
                value={property}
                onChange={(e) => setProperty(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Other Assets (Gold, Vehicles)
              </label>
              <input
                type="number"
                value={otherAssets}
                onChange={(e) => setOtherAssets(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-rose-600 dark:text-rose-500 mb-4 flex items-center border-t border-slate-200 dark:border-slate-800 pt-6">
            Liabilities (What you owe)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Home Loan
              </label>
              <input
                type="number"
                value={homeLoan}
                onChange={(e) => setHomeLoan(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Personal / Car Loan
              </label>
              <input
                type="number"
                value={personalLoan}
                onChange={(e) => setPersonalLoan(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Credit Card Debt
              </label>
              <input
                type="number"
                value={creditCard}
                onChange={(e) => setCreditCard(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Other Debt
              </label>
              <input
                type="number"
                value={otherDebt}
                onChange={(e) => setOtherDebt(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="p-6 flex flex-col justify-center items-center h-[400px] md:h-auto">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Assets vs Liabilities
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={results.chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
              >
                {results.chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
