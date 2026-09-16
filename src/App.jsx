import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Browse from "./pages/Browse";
import MyVault from "./pages/MyVault";
import Trending from "./pages/Trending";
import Login from "./pages/Login";
import TrailerModal from "./components/TrailerModal";
import { useState, useEffect } from "react";

export default function App() {
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [vaultItems, setVaultItems] = useState(() => {
    try {
      const saved = localStorage.getItem("aniVault_user_list");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to parse vault items from localStorage.", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("aniVault_user_list", JSON.stringify(vaultItems));
  }, [vaultItems]);

  const handleAutoAddToVault = (anime) => {
    setVaultItems((prevVault) => {
      const exists = prevVault.some((item) => item.anime.id === anime.id);
      if (exists) return prevVault;
      return [
        ...prevVault,
        { anime, status: "watching", watchedAt: new Date().toISOString() }, // Fixed: added ()
      ];
    });
  };

  return (
    <div className="mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/trending"
          element={
            <Trending onSelectAnime={(anime) => setSelectedAnime(anime)} /> // Fixed: passed onSelectAnime
          }
        />
        <Route
          path="/browse"
          element={
            <Browse onSelectAnime={(anime) => setSelectedAnime(anime)} />
          }
        />
        <Route path="/my-vault" element={<MyVault vaultItems={vaultItems} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />

      {selectedAnime && (
        <TrailerModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          onWatch={handleAutoAddToVault}
        />
      )}
    </div>
  );
}
