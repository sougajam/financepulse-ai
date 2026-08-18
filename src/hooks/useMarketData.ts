import { useState, useEffect } from "react";

// Fallback data if API rate limit is exceeded
const FALLBACK_DATA: MarketItem[] = [
  { symbol: "NIFTY 50", value: 22519.4, change: 0.85, isPositive: true },
  { symbol: "S&P 500", value: 5123.69, change: -0.12, isPositive: false },
  { symbol: "GOLD", value: 65430.0, change: 1.2, isPositive: true },
  { symbol: "USD/INR", value: 83.12, change: -0.05, isPositive: false },
];

export interface MarketItem {
  symbol: string;
  value: number;
  change: number;
  isPositive: boolean;
}

export function useMarketData() {
  const [data, setData] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        setIsLoading(true);
        const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

        // We will fetch real data for the S&P 500 (SPY ETF) as our live test
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${apiKey}`,
        );
        const result = await response.json();

        // Check if Alpha Vantage sent us an error message (usually rate limiting)
        if (result.Information || result.Note) {
          console.warn("API Rate Limit hit, using fallback data.");
          setData(FALLBACK_DATA);
          return;
        }

        const quote = result["Global Quote"];

        if (quote) {
          // If we got real data, let's inject the live SPY price into our fallback array
          const livePrice = parseFloat(quote["05. price"]);
          const liveChangePercent = parseFloat(
            quote["10. change percent"].replace("%", ""),
          );

          const liveData = FALLBACK_DATA.map((item) => {
            if (item.symbol === "S&P 500") {
              return {
                symbol: "S&P 500 (Live)",
                value: livePrice,
                change: liveChangePercent,
                isPositive: liveChangePercent >= 0,
              };
            }
            return item;
          });

          setData(liveData);
        } else {
          setData(FALLBACK_DATA);
        }
      } catch (err) {
        console.error("Failed to fetch market data:", err);
        // Silently fail to fallback data
        setData(FALLBACK_DATA);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarketData();
  }, []);

  return { data, isLoading };
}
