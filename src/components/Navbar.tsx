"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/trending", label: "Trending" },
    { to: "/markets", label: "Markets" },
    { to: "/stats", label: "Stats" },
    { to: "/learn", label: "Learn" },
    { to: "/about", label: "About" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end relative">
      <ul className="hidden md:flex space-x-4">
        {navLinks.map((link) => (
          <li
            key={link.to}
            className={pathname === link.to ? "text-blue-500" : ""}
          >
            <Link href={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <button className="md:hidden" onClick={() => setMenuOpen(true)}>
        <Menu />
      </button>

      {menuOpen && (
        <div className="h-screen flex fixed inset-0 z-50">
          <div
            className="w-1/3 bg-black/50"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="w-2/3 bg-white relative">
            <ul className="flex flex-col items-center justify-center h-full space-y-5 text-3xl">
              {navLinks.map((link) => (
                <li
                  key={link.to}
                  className={pathname === link.to ? "text-blue-500" : ""}
                >
                  <Link href={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <button
              className="absolute top-4 right-6"
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
