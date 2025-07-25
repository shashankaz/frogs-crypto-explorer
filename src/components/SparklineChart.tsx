import { useEffect, useState } from "react";
import { Link } from "react-router";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MarketCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

const popularIds = [
  "bitcoin",
  "ethereum",
  "solana",
  "ripple",
  "dogecoin",
  "cardano",
];

const SparklineChart = ({ prices }: { prices: number[] }) => {
  const data = prices.map((price, index) => ({ index, price }));
  const isUp = prices[0] < prices[prices.length - 1];
  const color = isUp ? "#16a34a" : "#dc2626";

  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const PopularCoins = () => {
  const [coins, setCoins] = useState<MarketCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularCoins = async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${popularIds.join(
          ","
        )}&order=market_cap_desc&per_page=10&page=1&sparkline=true`;
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
        {coins.map((coin) => {
          const isUp = coin.price_change_percentage_24h >= 0;
          return (
            <Link
              key={coin.id}
              to={`/coin/${coin.id}/?lang=en`}
              className="p-3 border border-gray-200 rounded-lg hover:shadow transition bg-white space-y-2"
            >
              <div className="flex items-center space-x-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <div>
                  <div className="text-sm font-medium">{coin.name}</div>
                  <div className="text-xs text-gray-500 uppercase">
                    {coin.symbol}
                  </div>
                </div>
              </div>
              <div className="text-xs">
                ${coin.current_price.toLocaleString()}{" "}
                <span className={isUp ? "text-green-600" : "text-red-500"}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
              {Array.isArray(coin.sparkline_in_7d?.price) &&
                coin.sparkline_in_7d.price.length > 0 && (
                  <SparklineChart prices={coin.sparkline_in_7d.price} />
                )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCoins;
