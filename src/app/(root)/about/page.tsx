export const metadata = {
  title: "About Us - Frogs Crypto Explorer",
  description:
    "Learn more about Frogs Crypto Explorer, a platform for exploring cryptocurrency data.",
};

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-gray-600 mb-6 text-lg">
        Welcome to{" "}
        <span className="font-semibold text-blue-600">
          Frogs Crypto Explorer
        </span>
        !<br />
        This is a modern, user-friendly platform to explore cryptocurrencies,
        view detailed coin data, and track market trends.
      </p>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside text-left text-gray-700 space-y-1">
          <li>Browse and search thousands of coins</li>
          <li>Bookmark your favorite coins</li>
          <li>View detailed coin statistics, charts, and market data</li>
          <li>Multi-language support</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
