import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Browse from "./pages/Browse";
import MyVault from "./pages/MyVault";
import Trending from "./pages/Trending";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/my-vault" element={<MyVault />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}
