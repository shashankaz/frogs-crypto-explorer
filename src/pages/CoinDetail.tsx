import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { Helmet } from "react-helmet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Loading from "../components/Loading";
import CoinNotFound from "../components/CoinNotFound";
import { CoinDetailType } from "../types/types";
import { currencyList } from "../utils/currencyList";
import { languages } from "../utils/languages";

const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [coinDetail, setCoinDetail] = useState<CoinDetailType | null>(null);
  const [coinNotFound, setCoinNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get("lang");
  const language =
    langParam && languages.includes(langParam as (typeof languages)[number])
      ? langParam
      : "en";

  const fetchCoinDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setCoinDetail(data);
      } else {
        setCoinNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching coin detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinDetail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading />;
  if (coinNotFound) return <CoinNotFound />;
  if (!coinDetail) return null;

  const {
    name,
    symbol,
    image,
    hashing_algorithm,
    categories,
    description,
    country_origin,
    genesis_date,
    market_cap_rank,
    watchlist_portfolio_users,
    sentiment_votes_up_percentage,
    sentiment_votes_down_percentage,
    market_data,
    tickers,
    community_data,
    developer_data,
    links,
  } = coinDetail;

  const chartData = currencyList.map((cur: string) => ({
    currency: cur.toUpperCase(),
    price: market_data?.current_price?.[cur] || 0,
    market_cap: market_data?.market_cap?.[cur] || 0,
    volume: market_data?.total_volume?.[cur] || 0,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Helmet>
        <title>{name} - Frogs Crypto Explorer</title>
        <meta
          name="description"
          content={`Learn more about ${name}, a cryptocurrency on Frogs Crypto Explorer.`}
        />
      </Helmet>

      <div className="flex items-center gap-4 mb-4">
        <img src={image?.large} alt={name} className="w-16 h-16" />
        <h1 className="text-2xl font-bold">
          {name} ({symbol?.toUpperCase()})
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p>
            <strong>Hashing Algorithm:</strong> {hashing_algorithm || "N/A"}
          </p>
          <p>
            <strong>Categories:</strong> {categories?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Country of Origin:</strong> {country_origin || "N/A"}
          </p>
          <p>
            <strong>Genesis Date:</strong> {genesis_date || "N/A"}
          </p>
          <p>
            <strong>Market Cap Rank:</strong> {market_cap_rank || "N/A"}
          </p>
          <p>
            <strong>Watchlist Users:</strong> {watchlist_portfolio_users || 0}
          </p>
          <p>
            <strong>Sentiment Up:</strong> {sentiment_votes_up_percentage || 0}%
          </p>
          <p>
            <strong>Sentiment Down:</strong>{" "}
            {sentiment_votes_down_percentage || 0}%
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {description?.[language] || "No description."}
          </p>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Price Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="currency" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        <h2 className="text-xl font-bold mt-8 mb-4">Market Cap Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="currency" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="market_cap"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        <h2 className="text-xl font-bold mt-8 mb-4">Volume Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="currency" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#ff7300"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Market Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              {[
                "Currency",
                "Current Price",
                "ATH",
                "ATH % Change",
                "ATH Date",
                "ATL",
                "ATL % Change",
                "ATL Date",
                "Market Cap",
                "FDV",
                "Volume",
                "High 24h",
                "Low 24h",
              ].map((head) => (
                <th key={head} className="p-2 border">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currencyList.map((cur) => (
              <tr key={cur}>
                <td className="border p-2">{cur.toUpperCase()}</td>
                <td className="border p-2">
                  {market_data?.current_price?.[cur] ?? "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.ath?.[cur] ?? "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.ath_change_percentage?.[cur]?.toFixed(2) ??
                    "N/A"}
                  %
                </td>
                <td className="border p-2">
                  {market_data?.ath_date?.[cur]
                    ? new Date(market_data.ath_date[cur]).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.atl?.[cur] ?? "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.atl_change_percentage?.[cur]?.toFixed(2) ??
                    "N/A"}
                  %
                </td>
                <td className="border p-2">
                  {market_data?.atl_date?.[cur]
                    ? new Date(market_data.atl_date[cur]).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.market_cap?.[cur] ?? "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.fully_diluted_valuation?.[cur] ?? "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.total_volume?.[cur] ?? "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.high_24h?.[cur] ?? "N/A"}
                </td>
                <td className="border p-2">
                  {market_data?.low_24h?.[cur] ?? "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">
        Community & Developer Stats
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Community Data</h3>
          <p>
            <strong>Reddit Subscribers:</strong>{" "}
            {community_data?.reddit_subscribers ?? "N/A"}
          </p>
          <p>
            <strong>Reddit Avg. Posts (48h):</strong>{" "}
            {community_data?.reddit_average_posts_48h ?? "N/A"}
          </p>
          <p>
            <strong>Reddit Avg. Comments (48h):</strong>{" "}
            {community_data?.reddit_average_comments_48h ?? "N/A"}
          </p>
          <p>
            <strong>Telegram Channel Users:</strong>{" "}
            {community_data?.telegram_channel_user_count ?? "N/A"}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Developer Data</h3>
          <p>
            <strong>Stars:</strong> {developer_data?.stars ?? "N/A"}
          </p>
          <p>
            <strong>Forks:</strong> {developer_data?.forks ?? "N/A"}
          </p>
          <p>
            <strong>Subscribers:</strong> {developer_data?.subscribers ?? "N/A"}
          </p>
          <p>
            <strong>Commits (last 4 weeks):</strong>{" "}
            {developer_data?.commit_count_4_weeks ?? "N/A"}
          </p>
          <p>
            <strong>Pull Requests Merged:</strong>{" "}
            {developer_data?.pull_requests_merged ?? "N/A"}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Links</h2>
      <ul className="list-disc ml-6 text-sm">
        {links?.homepage?.[0] && (
          <li>
            <a
              href={links.homepage[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Homepage
            </a>
          </li>
        )}
        {links?.whitepaper && (
          <li>
            <a
              href={links.whitepaper}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Whitepaper
            </a>
          </li>
        )}
        {links?.subreddit_url && (
          <li>
            <a
              href={links.subreddit_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Subreddit
            </a>
          </li>
        )}
        {links?.twitter_screen_name && (
          <li>
            <a
              href={`https://twitter.com/${links.twitter_screen_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Twitter
            </a>
          </li>
        )}
        {links?.facebook_username && (
          <li>
            <a
              href={`https://facebook.com/${links.facebook_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
          </li>
        )}
        {links?.repos_url?.github?.map((url: string, i: number) => (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub Repo {i + 1}
            </a>
          </li>
        ))}
      </ul>

      {tickers && tickers.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4">Top Markets</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Exchange</th>
                  <th className="p-2 border">Pair</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Volume</th>
                  <th className="p-2 border">Trust</th>
                </tr>
              </thead>
              <tbody>
                {tickers?.map((t: any, i: number) => (
                  <tr key={i}>
                    <td className="border p-2">{t.market?.name ?? "N/A"}</td>
                    <td className="border p-2">
                      {t.base}/{t.target}
                    </td>
                    <td className="border p-2">{t.last ?? "N/A"}</td>
                    <td className="border p-2">
                      {t.volume?.toFixed(2) ?? "N/A"}
                    </td>
                    <td className="border p-2">{t.trust_score ?? "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetail;
