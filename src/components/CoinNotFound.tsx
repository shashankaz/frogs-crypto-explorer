import { Link } from "react-router";

const CoinNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      <div className="text-6xl font-bold text-blue-600 mb-2">😕</div>
      <h2 className="text-2xl font-semibold mb-2">Coin Not Found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, we couldn't find the coin you're looking for. It may have been
        removed or the ID is incorrect.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default CoinNotFound;
