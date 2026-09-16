import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "motion/react";

export default function Browse({ onSelectAnime }) {
  // 1. Component State
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination State
  const [offset, setOffset] = useState(0);
  const limit = 18;

  // 2. Data Fetching Effect
  useEffect(() => {
    const controller = new AbortController();

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const endpoint = appliedQuery.trim()
          ? `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(appliedQuery)}&page[limit]=${limit}&page[offset]=${offset}`
          : `https://kitsu.io/api/edge/anime?page[limit]=${limit}&page[offset]=${offset}&sort=-userCount`;

        const response = await axios.get(endpoint, {
          signal: controller.signal,
        });

        setResults(response.data.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Failed to fetch anime. Please try again!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();

    return () => controller.abort();
  }, [appliedQuery, offset]);

  // 3. Search Form Handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setOffset(0); // Reset to page 1 on new search
    setAppliedQuery(searchQuery);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="mb-10 text-center mx-6 flex flex-col justify-center items-center">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{duration: 0.8, ease: "easeOut"}}
          className="text-xl md:text-3xl font-poppins font-bold tracking-wide mb-8">
          Browse Anime
        </motion.h1>

        <form
          onSubmit={handleSearchSubmit}
          className="flex gap-4 max-w-lg mx-auto mb-10"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anime (e.g., DragonBall, Bleach)..."
            className="w-full px-4 pr-24 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 text-left focus:outline-none focus:border-red-500 transition-colors"
          />
          <button
            type="submit"
            className="px-5 md:px-10 font-poppins py-2.5 bg-red-700 hover:bg-red-500 active:bg-red-600 font-medium text-white rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Grid Results */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-slate-900 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-400 my-12">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((anime) => {
            const { title, posterImage, canonicalTitle } = anime.attributes;
            const displayTitle = title?.en_jp || canonicalTitle;
            const poster = posterImage?.medium || posterImage?.small;

            return (
              <div
                key={anime.id}
                onClick={() => onSelectAnime && onSelectAnime(anime)}
                className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500/50 hover:scale-[1.02] transition-all group"
              >
                <div className="aspect-2/3 w-full overflow-hidden bg-slate-800">
                  <img
                    src={poster}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-slate-200 line-clamp-2">
                    {displayTitle}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={offset === 0 || isLoading}
          onClick={() => setOffset((prev) => Math.max(0, prev - limit))}
          className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-700 transition-colors cursor-pointer"
        >
          Previous
        </button>
        <span className="text-sm text-slate-400">
          Page {Math.floor(offset / limit) + 1}
        </span>
        <button
          disabled={results.length < limit || isLoading}
          onClick={() => setOffset((prev) => prev + limit)}
          className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-700 transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
