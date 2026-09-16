import { useState, useEffect } from "react";

export default function MyVault({ onSelectAnime }) {
  const [vaultItems, setVaultItems] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // Load saved anime from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("aniVault_user_list") || "[]",
    );
    setVaultItems(saved);
  }, []);

  // Filter items based on active tab selection
  const filteredItems = vaultItems.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 max-w-7xl mx-auto">
      {/* Header & Stats Bar */}
      <div className="mb-8">
        <h1 className="text-3xl font-poppins text-red-500 font-bold tracking-wide mb-6">
          My Vault
        </h1>
        <p className="text-slate-400 font-syne">
          Manage your personal anime collection and watch history.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="block text-2xl font-bold text-red-500">
              {vaultItems.length}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              Total Saved
            </span>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="block text-2xl font-bold text-red-500">
              {vaultItems.filter((i) => i.status === "completed").length}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              Completed
            </span>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="block text-2xl font-bold text-red-500">
              {vaultItems.filter((i) => i.status === "watching").length}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              Watching
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-4 mb-8">
        {["all", "watching", "completed", "plan-to-watch"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 border border-slate-800/80 rounded-2xl">
          <p className="text-slate-400 mb-4">No anime added to this tab yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.anime.id}
              onClick={() => onSelectAnime && onSelectAnime(item.anime)}
              className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden cursor-pointer hover:border-red-500/50 transition-all"
            >
              <div className="aspect-2/3 w-full overflow-hidden bg-slate-800">
                <img
                  src={item.anime.attributes.posterImage?.medium}
                  alt={item.anime.attributes.canonicalTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-slate-200 line-clamp-1">
                  {item.anime.attributes.canonicalTitle}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
