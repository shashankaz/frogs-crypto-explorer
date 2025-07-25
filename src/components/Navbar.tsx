import { Link, useLocation } from "react-router";

const Navbar = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
      <ul className="flex space-x-4">
        <li className={pathname === "/" ? "text-blue-500" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathname === "/about" ? "text-blue-500" : ""}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
