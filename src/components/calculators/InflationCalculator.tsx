import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState<number>(100000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [years, setYears] = useState<number>(10);

  const results = useMemo(() => {
    const r = inflationRate / 100;
    const t = years;

    // Formula for future cost: Future Value = Present Value * (1 + inflation rate)^years
    const futureCost = currentAmount * Math.pow(1 + r, t);

    // Formula for purchasing power: Purchasing Power = Present Value / (1 + inflation rate)^years
    const purchasingPower = currentAmount / Math.pow(1 + r, t);

    const chartData = [];
    for (let year = 1; year <= t; year++) {
      const projectedCost = currentAmount * Math.pow(1 + r, year);
      chartData.push({
        year: `Year ${year}`,
        "Original Value": currentAmount,
        "Inflated Cost": Math.round(projectedCost),
      });
    }

    return {
      futureCost: Math.round(futureCost),
      purchasingPower: Math.round(purchasingPower),
      difference: Math.round(futureCost - currentAmount),
      chartData,
    };
  }, [currentAmount, inflationRate, years]);

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
        <div className="p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Cost/Amount (₹)
            </label>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Expected Inflation Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Results & Chart Section */}
        <div className="p-6 md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Cost Increase
              </p>
              <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
                +{formatCurrency(results.difference)}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Future Value of ₹{currentAmount.toLocaleString()}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(results.purchasingPower)}
              </p>
            </div>
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-lg">
              <p className="text-sm text-rose-800 dark:text-rose-300 mb-1">
                Future Cost Required
              </p>
              <p className="text-2xl font-bold text-rose-700 dark:text-rose-400">
                {formatCurrency(results.futureCost)}
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={results.chartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
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
                <Bar
                  dataKey="Original Value"
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Inflated Cost"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
