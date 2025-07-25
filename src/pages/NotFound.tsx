import { Helmet } from "react-helmet";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      <Helmet>
        <title>Not Found - Frogs Crypto Explorer</title>
        <meta
          name="description"
          content="The page you are looking for does not exist."
        />
      </Helmet>

      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
