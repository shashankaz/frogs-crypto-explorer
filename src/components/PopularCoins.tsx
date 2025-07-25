import { useEffect, useState } from "react";
import { Link } from "react-router";

interface MarketCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

const popularIds = [
  "bitcoin",
  "ethereum",
  "solana",
  "ripple",
  "dogecoin",
  "cardano",
];

const PopularCoins = () => {
  const [coins, setCoins] = useState<MarketCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularCoins = async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${popularIds.join(
          ","
        )}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
        const response = await fetch(url);
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        console.error("Error fetching popular coins:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCoins();
  }, []);

  if (loading) {
    return (
      <div className="py-6 text-sm text-gray-500">Loading popular coins...</div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Popular Coins</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {coins.map((coin, index) => (
          <Link
            key={index}
            to={`/coin/${coin.id}/?lang=en`}
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:shadow transition bg-white"
          >
            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
            <div className="flex-1">
              <div className="text-sm font-medium">{coin.name}</div>
              <div className="text-xs text-gray-500">
                ${coin.current_price.toLocaleString()}{" "}
                <span
                  className={`ml-1 ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCoins;
