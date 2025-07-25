import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

import Loading from "../components/Loading";
import { MarketCoin } from "../types/types";

const Markets = () => {
  const [coins, setCoins] = useState<MarketCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const fetchMarkets = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
      );
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error("Failed to fetch market data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Helmet>
        <title>Market Overview - Frogs Crypto Explorer</title>
        <meta
          name="description"
          content="Live cryptocurrency market data - prices, market cap, volumes, and 24h change."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6">Market Overview</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Explore live cryptocurrency market data including prices, market cap,
        volumes, and 24h change for over 10,000 coins.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="text-left">
              <th className="p-2">Rank</th>
              <th className="p-2">Coin</th>
              <th className="p-2">Price (USD)</th>
              <th className="p-2">24h % Change</th>
              <th className="p-2">Market Cap</th>
              <th className="p-2">Volume (24h)</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 border-b">
                <td className="p-2">{c.market_cap_rank}</td>
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <Link
                    to={`/coin/${c.id}/?lang=en`}
                    className="font-medium hover:underline"
                  >
                    {c.name} ({c.symbol.toUpperCase()})
                  </Link>
                </td>
                <td className="p-2">${c.current_price.toLocaleString()}</td>
                <td
                  className={`p-2 ${
                    c.price_change_percentage_24h !== null
                      ? c.price_change_percentage_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                      : ""
                  }`}
                >
                  {c.price_change_percentage_24h !== null
                    ? c.price_change_percentage_24h.toFixed(2) + "%"
                    : "—"}
                </td>
                <td className="p-2">${c.market_cap.toLocaleString()}</td>
                <td className="p-2">${c.total_volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1.5 text-sm bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Markets;
