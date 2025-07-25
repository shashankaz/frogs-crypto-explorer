import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
const Home = lazy(() => import("./pages/Home"));
const CoinDetail = lazy(() => import("./pages/CoinDetail"));
const Trending = lazy(() => import("./pages/Trending"));
const Markets = lazy(() => import("./pages/Markets"));
const Stats = lazy(() => import("./pages/Stats"));
const Learn = lazy(() => import("./pages/Learn"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
