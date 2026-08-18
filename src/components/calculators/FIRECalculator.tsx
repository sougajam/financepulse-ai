import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

export function FIRECalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(50);
  const [currentSavings, setCurrentSavings] = useState<number>(1000000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(50000);
  const [annualExpenses, setAnnualExpenses] = useState<number>(600000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [inflationRate, setInflationRate] = useState<number>(6);

  const results = useMemo(() => {
    const yearsToRetire = Math.max(0, retirementAge - currentAge);
    const r = expectedReturn / 100;
    const i = inflationRate / 100;

    // 1. Calculate future annual expenses due to inflation
    const futureAnnualExpenses =
      annualExpenses * Math.pow(1 + i, yearsToRetire);

    // 2. FIRE Target (Rule of 25: 25x annual expenses)
    const fireTarget = futureAnnualExpenses * 25;

    // 3. Project Corpus Growth
    const chartData = [];
    let currentCorpus = currentSavings;

    for (let year = 0; year <= yearsToRetire; year++) {
      const age = currentAge + year;

      chartData.push({
        age: `Age ${age}`,
        "Projected Corpus": Math.round(currentCorpus),
        "FIRE Target": Math.round(fireTarget),
      });

      // Grow corpus for next year (Interest on current + 12 months of investments)
      const yearEndCorpus = currentCorpus * (1 + r) + monthlyInvestment * 12;
      currentCorpus = yearEndCorpus;
    }

    const projectedFinalCorpus =
      chartData.length > 0
        ? chartData[chartData.length - 1]["Projected Corpus"]
        : currentSavings;
    const isOnTrack = projectedFinalCorpus >= fireTarget;

    return {
      fireTarget,
      projectedFinalCorpus,
      isOnTrack,
      chartData,
      yearsToRetire,
    };
  }, [
    currentAge,
    retirementAge,
    currentSavings,
    monthlyInvestment,
    annualExpenses,
    expectedReturn,
    inflationRate,
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
      <div className="grid lg:grid-cols-3">
        {/* Input Section */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 space-y-4 max-h-[600px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Current Age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Target Retire Age
              </label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Current Savings/Investments (₹)
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Monthly Investment (₹)
            </label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Current Annual Expenses (₹)
            </label>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Expected Return (%)
              </label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Inflation Rate (%)
              </label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Results & Chart Section */}
        <div className="p-6 lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Target FIRE Corpus (Inflation Adjusted)
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(results.fireTarget)}
              </p>
            </div>

            <div
              className={`p-4 rounded-lg border ${results.isOnTrack ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800" : "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800"}`}
            >
              <p
                className={`text-sm mb-1 ${results.isOnTrack ? "text-emerald-800 dark:text-emerald-300" : "text-rose-800 dark:text-rose-300"}`}
              >
                Projected Corpus at Age {retirementAge}
              </p>
              <p
                className={`text-2xl font-bold ${results.isOnTrack ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}
              >
                {formatCurrency(results.projectedFinalCorpus)}
              </p>
              <p
                className={`text-xs mt-1 font-medium ${results.isOnTrack ? "text-emerald-600 dark:text-emerald-500" : "text-rose-600 dark:text-rose-500"}`}
              >
                {results.isOnTrack
                  ? "✓ You are on track to retire early!"
                  : "⚠ You may fall short of your goal."}
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={results.chartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="age" stroke="#94a3b8" fontSize={12} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(value) =>
                    `₹${(value / 10000000).toFixed(1)}Cr`
                  }
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
                <ReferenceLine
                  y={results.fireTarget}
                  label="FIRE Target"
                  stroke="#f97316"
                  strokeDasharray="3 3"
                />
                <Line
                  type="monotone"
                  dataKey="Projected Corpus"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
