// src/pages/Trending.jsx
import { useState, useEffect } from "react";
import { getTrendingAnime } from "../services/api";

export default function Trending() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTrending() {
      try {
        setLoading(true);
        // Call the imported function
        const data = await getTrendingAnime(controller.signal);
        setAnimeList(data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError(err.message || "Failed to fetch trending anime");
        }
      } finally {
        setLoading(false);
      }
    }

    loadTrending();

    return () => controller.abort();
  }, []);

  // 1. Skeleton Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Trending Right Now
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 animate-pulse"
            >
              <div className="aspect-[2/3] w-full bg-slate-800" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <p className="text-red-400 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg border border-slate-800 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // 3. Render API Data
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Trending Right Now</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {animeList.map((anime, index) => {
          const { canonicalTitle, posterImage, averageRating } =
            anime.attributes;

          return (
            <div
              key={anime.id}
              className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col group hover:border-slate-700 transition-colors"
            >
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-md">
                #{index + 1}
              </span>

              <div className="aspect-[2/3] w-full bg-slate-950 overflow-hidden">
                <img
                  src={posterImage?.small}
                  alt={canonicalTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 flex flex-col flex-1 justify-between">
                <h3
                  className="font-semibold text-sm line-clamp-1"
                  title={canonicalTitle}
                >
                  {canonicalTitle}
                </h3>
                <span className="text-xs text-slate-400 mt-1">
                  ★ {averageRating ? (averageRating / 10).toFixed(1) : "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
