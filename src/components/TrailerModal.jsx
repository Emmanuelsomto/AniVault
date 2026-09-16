import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function TrailerModal({ anime, onClose, onWatch }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (anime && onWatch) {
      onWatch(anime);
    }
  }, [anime?.id, onWatch]);

  if (!anime) return null;
  const { youtubeVideoId } = anime.attributes || {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 z-20 cursor-pointer text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 p-2 rounded-full transition-colors pointer-events-auto"
          aria-label="Close modal"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="relative pt-[56.25%] min-h-55 w-full bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&playsinline=1`}
            title="Anime Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
