import { Info, ShieldAlert, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Learn Crypto - Frogs Crypto Explorer",
  description:
    "Learn the basics of cryptocurrency. Understand Bitcoin, Ethereum, blockchain, and how to navigate crypto markets safely.",
};

const Learn = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Learn About Crypto</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        New to cryptocurrency? This guide covers the essentials of Bitcoin,
        Ethereum, blockchain technology, and how to safely navigate the crypto
        world.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <Info className="text-indigo-500 size-5" />
          What is Bitcoin & Ethereum?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          <strong>Bitcoin</strong> is a decentralized digital currency launched
          in 2009. It allows peer-to-peer transactions without intermediaries,
          using blockchain technology.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Ethereum</strong> goes beyond currency — it&apos;s a smart
          contract platform enabling decentralized apps (dApps) and tokens like
          NFTs. It's the foundation of DeFi and Web3.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="text-green-500 size-5" />
          How Crypto Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          Cryptocurrencies operate on a distributed ledger called the
          blockchain. Every transaction is verified by a network of nodes
          through consensus mechanisms like Proof of Work (PoW) or Proof of
          Stake (PoS).
        </p>
        <p className="text-gray-700 leading-relaxed">
          Users store their crypto in wallets (software or hardware), and use
          private keys to sign transactions. Public keys act as addresses to
          send and receive funds.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <Info className="text-yellow-500 size-5" />
          How to Read Market Data
        </h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
          <li>
            <strong>Price:</strong> Current value of the asset in a given
            currency.
          </li>
          <li>
            <strong>Market Cap:</strong> Total value = price × circulating
            supply. Shows asset scale.
          </li>
          <li>
            <strong>24h Volume:</strong> Total traded value in last 24 hours.
            Indicates liquidity.
          </li>
          <li>
            <strong>24h Change:</strong> Percentage change in price over the
            last 24 hours.
          </li>
          <li>
            <strong>Circulating Supply:</strong> Amount of coins currently in
            the market.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <ShieldAlert className="text-red-500 size-5" />
          Risks & Best Practices
        </h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
          <li>
            <strong>Volatility:</strong> Crypto prices can swing wildly in short
            periods.
          </li>
          <li>
            <strong>Security:</strong> Use trusted wallets & never share your
            private key.
          </li>
          <li>
            <strong>Scams:</strong> Beware of fake websites, phishing, and
            pump-and-dump schemes.
          </li>
          <li>
            <strong>Research:</strong> Always do your own research (DYOR) before
            investing.
          </li>
          <li>
            <strong>Backups:</strong> Safely store wallet recovery phrases
            offline.
          </li>
        </ul>
      </section>

      <p className="text-gray-600 text-sm italic">
        This content is for educational purposes only and does not constitute
        financial advice.
      </p>
    </div>
  );
};

export default Learn;
