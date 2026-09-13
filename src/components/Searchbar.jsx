import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const searchContainerRef = useRef(null);

  // Close dropdown when clicking outside the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API search effect
  useEffect(() => {
    if (!query.trim() || query.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);

      axios
        .get(
          `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
            query.trim(),
          )}&sort=-userCount&page[limit]=5`,
        )
        .then((response) => {
          const formattedResults = response.data.data.map((item) => ({
            id: item.id,
            title: item.attributes.canonicalTitle,
            type: item.attributes.showType,
            score: item.attributes.averageRating
              ? (item.attributes.averageRating / 10).toFixed(1)
              : "N/A",
            youtubeVideoId: item.attributes.youtubeVideoId,
            images: {
              jpg: {
                small_image_url: item.attributes.posterImage?.tiny,
              },
            },
          }));

          setResults(formattedResults);
        })
        .catch((error) => {
          console.error("Kitsu API Error:", error);
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectAnime = (anime) => {
    if (anime.youtubeVideoId) {
      setSelectedTrailer(anime.youtubeVideoId);
    } else {
      alert("No official trailer available for this anime.");
    }
    setQuery("");
    setResults([]);
  };

  return (
    <div
      ref={searchContainerRef}
      className="relative w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto my-2 sm:my-4 font-sans px-2 sm:px-0"
    >
      {/* Search Input Box */}
      <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-lg px-3 w-full py-2 sm:px-3.5 sm:py-2.5 focus-within:border-[#e50914] transition-colors duration-200 shadow-md">
        <FaSearch className="text-[#777] mr-2 text-sm sm:text-base shrink-0" />
        <input
          type="text"
          className="w-full min-w-0 bg-transparent border-none outline-none font-syne text-white text-xs sm:text-sm placeholder-[#666]"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="text-[#777] hover:text-white transition-colors text-xs p-1 shrink-0 ml-1"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Floating Dropdown Results Box */}
      {query.length >= 3 && (
        <div className="absolute top-[calc(100%+6px)] left-2 right-2 sm:left-0 sm:right-0 bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-hidden shadow-2xl z-100 max-h-[70vh] overflow-y-auto p-1.5 sm:p-2">
          {loading && (
            <p className="text-[#888] p-3.5 m-0 text-center text-xs sm:text-sm">
              Searching Kitsu...
            </p>
          )}

          {!loading && results.length === 0 && (
            <p className="text-[#888] p-3.5 m-0 text-center text-xs sm:text-sm">
              No anime found
            </p>
          )}

          {!loading &&
            results.map((anime) => (
              <div
                key={anime.id}
                onClick={() => handleSelectAnime(anime)}
                className="flex items-center p-2 sm:p-2.5 border-b border-[#222]/60 last:border-b-0 hover:bg-[#222] rounded-md transition-colors duration-150 gap-2.5 cursor-pointer mb-1 last:mb-0"
              >
                <img
                  src={anime.images?.jpg?.small_image_url}
                  alt={anime.title}
                  className="w-9 h-12.5 sm:w-10.5 sm:h-14.5 object-cover rounded shrink-0 bg-[#2a2a2a]"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-[#f5f5f5] m-0 text-xs sm:text-sm font-semibold truncate">
                    {anime.title}
                  </h4>
                  <span className="text-[#e50914] text-[10px] sm:text-xs font-bold block mt-0.5">
                    {anime.type?.toUpperCase()} • ★ {anime.score}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Trailer Video Modal */}
      {selectedTrailer && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex justify-center items-center z-1000 p-3 sm:p-4">
          <div className="w-full max-w-3xl bg-[#111] border border-[#2a2a2a] rounded-xl p-3 sm:p-4 shadow-2xl">
            <button
              className="inline-flex items-center gap-1.5 bg-[#e50914] text-white border-none px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-md cursor-pointer text-xs font-semibold mb-2.5 sm:mb-3 hover:opacity-85 transition-opacity"
              onClick={() => setSelectedTrailer(null)}
            >
              <FaTimes /> Close
            </button>
            <div className="relative min-h-55 pt-[56.25%] h-0 rounded-lg overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=1&mute=1&controls=1&playsinline=1&rel=0&enablejsapi=1`}
                title="Anime Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
