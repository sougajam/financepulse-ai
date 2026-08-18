import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function CompoundInterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [annualReturn, setAnnualReturn] = useState<number>(12);
  const [years, setYears] = useState<number>(15);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // 12 = Monthly

  const results = useMemo(() => {
    const r = annualReturn / 100;
    const n = compoundingFrequency;
    const t = years;

    const chartData = [];
    let currentBalance = initialInvestment;
    let totalContributions = initialInvestment;

    // Calculate year by year for the chart
    for (let year = 1; year <= t; year++) {
      // Math for this specific year
      // A = P(1 + r/n)^(n) for the principal
      let yearEndBalance = currentBalance * Math.pow(1 + r / n, n);

      // Add monthly contributions for the year
      // Future Value of a Series formula applied for 12 months
      if (monthlyContribution > 0) {
        // Simplifying by assuming contributions grow at the nominal rate monthly
        const monthlyRate = r / 12;
        const contributionGrowth =
          monthlyContribution *
          ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) *
          (1 + monthlyRate);
        yearEndBalance += contributionGrowth;
        totalContributions += monthlyContribution * 12;
      }

      currentBalance = yearEndBalance;

      chartData.push({
        year: `Year ${year}`,
        Principal: Math.round(totalContributions),
        Interest: Math.round(currentBalance - totalContributions),
        TotalValue: Math.round(currentBalance),
      });
    }

    const finalValue = currentBalance;
    const totalInterest = finalValue - totalContributions;

    return {
      finalValue: Math.round(finalValue),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(totalInterest),
      chartData,
    };
  }, [
    initialInvestment,
    monthlyContribution,
    annualReturn,
    years,
    compoundingFrequency,
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-3">
        {/* Input Section */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Initial Investment (₹)
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Monthly Contribution (₹)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Annual Return (%)
            </label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Duration (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Compounding Frequency
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value={1}>Annually</option>
              <option value={2}>Semi-Annually</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
            </select>
          </div>
        </div>

        {/* Results & Chart Section */}
        <div className="p-6 md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Total Principal
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(results.totalContributions)}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Total Interest
              </p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-300 mb-1">
                Final Amount
              </p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {formatCurrency(results.finalValue)}
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={results.chartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorPrincipal"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorInterest"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number" ? formatCurrency(value) : ""
                  }
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Principal"
                  stackId="1"
                  stroke="#94a3b8"
                  fill="url(#colorPrincipal)"
                />
                <Area
                  type="monotone"
                  dataKey="Interest"
                  stackId="1"
                  stroke="#a855f7"
                  fill="url(#colorInterest)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
