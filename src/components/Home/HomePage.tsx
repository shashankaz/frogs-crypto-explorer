"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Search } from "lucide-react";

import Loading from "../Loading";
import Pagination from "../Pagination";
import SparklineChart from "./SparklineChart";
import { Coin } from "@/types/types";

const HomePage = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedCoins");
    if (storedBookmarks) {
      setBookmarkedIds(JSON.parse(storedBookmarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedCoins", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  const fetchCoins = async () => {
    setLoading(true);
    const localCoins = localStorage.getItem("coins");
    if (localCoins) {
      setCoins(JSON.parse(localCoins));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "/api/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
      );
      const data = await response.json();
      setCoins(data);
      localStorage.setItem("coins", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    let filtered = coins;
    if (searchTerm) {
      filtered = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      const aBookmarked = bookmarkedIds.includes(a.id);
      const bBookmarked = bookmarkedIds.includes(b.id);
      return Number(bBookmarked) - Number(aBookmarked);
    });

    setFilteredCoins(sorted);
    setCurrentPage(1);
  }, [searchTerm, coins, bookmarkedIds]);

  if (loading) return <Loading />;

  const indexOfLastCoin = currentPage * limit;
  const indexOfFirstCoin = indexOfLastCoin - limit;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);
  const totalPages = Math.ceil(filteredCoins.length / limit) || 1;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">Frogs Crypto Explorer</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Discover and explore thousands of cryptocurrencies in one place! Easily
        search for any coin, view details, and bookmark your favorites for quick
        access anytime.
      </p>

      <SparklineChart />

      <h2 className="text-xl font-semibold mb-4">Search Coins</h2>
      <div className="mb-8 relative max-w-md">
        <input
          type="text"
          placeholder="Search for a coin..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCoins.map((coin) => {
          const isBookmarked = bookmarkedIds.includes(coin.id);
          return (
            <div
              key={coin.id}
              className={`border ${
                isBookmarked ? "border-blue-300 bg-blue-50" : "border-gray-200"
              } hover:shadow-md rounded-xl p-4 transition duration-150 flex items-start justify-between`}
            >
              <Link
                href={`/coin/${coin.id}/?lang=en`}
                className="mb-2 flex-1 flex items-center gap-3"
              >
                <Image
                  src={coin.image}
                  width={32}
                  height={32}
                  alt={coin.name}
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <div>
                  <h2 className="text-lg font-semibold">{coin.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleBookmark(coin.id);
                }}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark this coin"}
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    isBookmarked
                      ? "fill-blue-400 text-blue-500"
                      : "text-gray-500"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={filteredCoins.length}
          limit={limit}
          setLimit={(newLimit) => {
            setLimit(newLimit);
            setCurrentPage(1);
          }}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
