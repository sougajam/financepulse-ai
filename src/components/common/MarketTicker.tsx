import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export function MarketTicker() {
  const [data, setData] = useState<{
    symbol: string;
    price: string;
    change: string;
    changePercent: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        // Fetching SPY (S&P 500 ETF) from your new backend route
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/market/SPY`,
        );

        if (response.ok) {
          const marketData = await response.json();
          setData(marketData);
        }
      } catch (err) {
        console.error("Failed to fetch market data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarketData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-sm h-24 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-8"></div>
    );
  }

  if (!data) return null; // Hide the widget if the API fails or rate limit is hit

  const isPositive = parseFloat(data.change) >= 0;

  return (
    <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 mb-8 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white">
            S&P 500 (SPY)
          </h3>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
          LIVE
        </span>
      </div>

      <div className="flex items-baseline space-x-3">
        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
          ${data.price}
        </span>

        <div
          className={`flex items-center text-sm font-semibold ${isPositive ? "text-emerald-500" : "text-rose-500"}`}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {data.change} ({data.changePercent}%)
          </span>
        </div>
      </div>
    </div>
  );
}
