import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

import Loading from "../components/Loading";
import { TrendingCoin } from "../types/types";

const Trending = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      const data = await res.json();
      setTrendingCoins(data.coins || []);
    } catch (error) {
      console.error("Failed to fetch trending coins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Helmet>
        <title>Trending Coins - Frogs Crypto Explorer</title>
        <meta
          name="description"
          content="Discover the most popular cryptocurrencies right now based on user activity and market trends."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-4">Trending Coins</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Explore the top trending cryptocurrencies based on user interest and
        market activity. See which coins are gaining popularity right now.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trendingCoins.map(({ item }) => (
          <Link
            key={item.id}
            to={`/coin/${item.id}/?lang=en`}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition duration-150 flex gap-4 items-center"
          >
            <img
              src={item.thumb}
              alt={item.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500 text-sm">
                {item.symbol.toUpperCase()}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Market Cap Rank: #{item.market_cap_rank ?? "N/A"}
              </p>
            </div>
            <div className="text-sm text-blue-600 font-medium">
              🔥 #{item.score + 1}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
