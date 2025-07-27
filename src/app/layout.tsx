import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frogs Crypto Explorer",
  description:
    "Discover and explore thousands of cryptocurrencies. Search, bookmark, and view detailed stats with Frogs Crypto Explorer.",
  keywords:
    "crypto, cryptocurrency, coins, bitcoin, ethereum, frogs, explorer, market, stats, bookmark",
  authors: [{ name: "Frogs Crypto Explorer Team" }],
  openGraph: {
    title: "Frogs Crypto Explorer",
    description:
      "Discover and explore thousands of cryptocurrencies. Search, bookmark, and view detailed stats with Frogs Crypto Explorer.",
    type: "website",
    url: "https://frogs-crypto-explorer.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frogs Crypto Explorer",
    description:
      "Discover and explore thousands of cryptocurrencies. Search, bookmark, and view detailed stats with Frogs Crypto Explorer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
