"use client";

import { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import { GlobalStats } from "@/types/types";

const StatsPage = () => {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGlobalStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/global");
      const data = await res.json();
      setStats(data.data);
    } catch (error) {
      console.error("Failed to fetch global stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  if (loading || !stats) return <Loading />;

  const formatNum = (num: number, fraction = 2) =>
    num?.toLocaleString(undefined, {
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction,
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">Global Crypto Market Stats</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Get the latest global cryptocurrency market statistics including total
        market cap, volume, active cryptocurrencies, and more. Stay updated with
        real-time data on the crypto ecosystem.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-1">Total Market Cap</h2>
          <p className="text-green-600 text-lg font-medium">
            ${formatNum(stats.total_market_cap.usd, 0)}
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-1">24h Volume</h2>
          <p className="text-blue-600 text-lg font-medium">
            ${formatNum(stats.total_volume.usd, 0)}
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-1">Bitcoin Dominance</h2>
          <p className="text-yellow-600 text-lg font-medium">
            {formatNum(stats.market_cap_percentage.btc)}%
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-1">Ethereum Dominance</h2>
          <p className="text-purple-600 text-lg font-medium">
            {formatNum(stats.market_cap_percentage.eth)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-1">
            Active Cryptocurrencies
          </h2>
          <p className="text-gray-800 text-lg font-medium">
            {formatNum(stats.active_cryptocurrencies, 0)}
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-1">Active Markets</h2>
          <p className="text-gray-800 text-lg font-medium">
            {formatNum(stats.markets, 0)}
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-1">Active Exchanges</h2>
          <p className="text-gray-800 text-lg font-medium">
            {formatNum(stats.active_exchanges || 0, 0)}
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-1">
            Market Cap Change (24h)
          </h2>
          <p
            className={`text-lg font-medium ${
              stats.market_cap_change_percentage_24h_usd >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {formatNum(stats.market_cap_change_percentage_24h_usd)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
