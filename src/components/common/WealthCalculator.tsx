import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calculator } from "lucide-react";

export function WealthCalculator() {
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");

  // Adjusted default values based on starting currency
  const [principal, setPrincipal] = useState(100000); // 1 Lakh default
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(30);

  // Dynamic slider limits based on currency
  const limits = {
    principal: {
      max: currency === "INR" ? 10000000 : 1000000,
      step: currency === "INR" ? 10000 : 1000,
    },
    monthly: {
      max: currency === "INR" ? 500000 : 20000,
      step: currency === "INR" ? 1000 : 100,
    },
  };

  const chartData = useMemo(() => {
    let currentBalance = principal;
    const data = [];

    data.push({ year: "Year 0", balance: currentBalance });

    for (let i = 1; i <= years; i++) {
      for (let month = 1; month <= 12; month++) {
        currentBalance += monthlyContribution;
        currentBalance *= 1 + rate / 100 / 12;
      }
      data.push({
        year: `Year ${i}`,
        balance: Math.round(currentBalance),
      });
    }
    return data;
  }, [principal, monthlyContribution, rate, years]);

  // Automatically formats as $100,000 or ₹1,00,000 depending on locale
  const formatCurrency = (value: number) => {
    const locale = currency === "INR" ? "en-IN" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Formats large axis numbers into 10K, 1M, or 10T (or Indian variants)
  const formatCompact = (value: number) => {
    const locale = currency === "INR" ? "en-IN" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const finalBalance = chartData[chartData.length - 1]?.balance || 0;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8 text-emerald-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Interactive Wealth Calculator
          </h2>
        </div>

        {/* Currency Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${currency === "INR" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            ₹ INR
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${currency === "USD" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            $ USD
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-8 lg:col-span-1">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-slate-700 dark:text-slate-300">
                Initial Investment
              </label>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(principal)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={limits.principal.max}
              step={limits.principal.step}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-slate-700 dark:text-slate-300">
                Monthly Contribution
              </label>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(monthlyContribution)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={limits.monthly.max}
              step={limits.monthly.step}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-slate-700 dark:text-slate-300">
                Expected Return (Rate)
              </label>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {rate}%
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-slate-700 dark:text-slate-300">
                Time Horizon
              </label>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {years} Years
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
              Projected Future Wealth
            </p>
            <p className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(finalBalance)}
            </p>
          </div>

          <div className="h-64 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="year"
                  minTickGap={30}
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis
                  tickFormatter={formatCompact}
                  stroke="#64748b"
                  fontSize={12}
                  width={75}
                />
                <Tooltip
                  formatter={(value) => [
                    formatCurrency(typeof value === "number" ? value : 0),
                    "Net Worth",
                  ]}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBalance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
