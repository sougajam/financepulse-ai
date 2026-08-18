import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarketData } from "../../hooks/useMarketData";

export function MarketSnapshot() {
  const { data, isLoading } = useMarketData();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {isLoading
        ? // The Loading Skeleton
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse"
            >
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            </div>
          ))
        : // The Actual Data
          data.map((item) => (
            <div
              key={item.symbol}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                {item.symbol}
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {item.symbol === "USD/INR" ? "₹" : ""}
                {item.value.toLocaleString()}
              </div>
              <div
                className={`flex items-center text-sm font-medium ${item.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
              >
                {item.isPositive ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(item.change)}%
              </div>
            </div>
          ))}
    </div>
  );
}
