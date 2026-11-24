import { useState } from "react";
import RecoHeader from "../recomcontent/header";
import ProfileStrip from "../recomcontent/recprofile";
import BestMatch from "../recomcontent/matchedprofile";
import RecoFilters from "../recomcontent/filter";
import RecoCard from "../recomcontent/cards";
import RecoDetails from "../recomcontent/details";
import { LoadingGrid, EmptyState, ErrorState } from "../recomcontent/states";

export default function Recommendations() {
  
  const [data, setData] = useState({ profileTags: [], bestMatch: null, items: [], hasMore: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ category: "all", sort: "match", freeOnly: false, onlineOnly: false });
  const [selectedId, setSelectedId] = useState(null);

  const changeFilters = (patch) => setFilters((prev) => ({ ...prev, ...patch }));

  // Filter and sort what is shown
  const visibleItems = data.items
    .filter((i) => filters.category === "all" || i.category === filters.category)
    .filter((i) => !filters.freeOnly || i.cost === "Free")
    .filter((i) => !filters.onlineOnly || i.mode === "Online")
    .sort((a, b) =>
      filters.sort === "deadline"
        ? (a.deadline || "9999-12-31").localeCompare(b.deadline || "9999-12-31")
        : (b.match ?? 0) - (a.match ?? 0)
    );

  // The item open in the details panel (always the latest version)
  const selectedItem = [data.bestMatch, ...data.items].find((i) => i && i.id === selectedId) || null;

  // Update one item everywhere it appears
  const updateItem = (id, patch) =>
    setData((prev) => ({
      ...prev,
      bestMatch: prev.bestMatch && prev.bestMatch.id === id ? { ...prev.bestMatch, ...patch } : prev.bestMatch,
      items: prev.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    }));

  const loadRecommendations = async () => {
    setError("");
    setLoading(true);
    try {
      // TODO: call your AI / backend here, then: setData(result)
    } catch {
      setError("Could not load recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (item) => {
    updateItem(item.id, { saved: !item.saved });
    // TODO: save or unsave on the backend
  };

  const handleDismiss = (item) => {
    setData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== item.id) }));
    // TODO: tell the backend this was not interesting
  };

  const handleFeedback = (item, value) => {
    updateItem(item.id, { feedback: value });
    // TODO: send the feedback to the backend
  };

  const handleLoadMore = () => {
    // TODO: fetch the next page and add it to data.items
  };

  return (
    <div className="space-y-6">
      <RecoHeader onRefresh={loadRecommendations} refreshing={loading} />
      <ProfileStrip tags={data.profileTags} />
      <BestMatch item={data.bestMatch} onView={(i) => setSelectedId(i.id)} onSave={handleSave} />
      <RecoFilters filters={filters} onChange={changeFilters} />

      {loading ? (
        <LoadingGrid />
      ) : error ? (
        <ErrorState message={error} onRetry={loadRecommendations} />
      ) : visibleItems.length === 0 ? (
        <EmptyState
          message={
            data.items.length === 0
              ? "No recommendations yet. Your personalized suggestions will appear here."
              : "No recommendations match these filters."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => (
            <RecoCard
              key={item.id}
              item={item}
              onView={(i) => setSelectedId(i.id)}
              onSave={handleSave}
              onDismiss={handleDismiss}
              onFeedback={handleFeedback}
            />
          ))}
        </div>
      )}

      {data.hasMore && !loading && !error && (
        <div className="text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:border-indigo-400"
          >
            Load more
          </button>
        </div>
      )}

      <RecoDetails item={selectedItem} onClose={() => setSelectedId(null)} onSave={handleSave} />
    </div>
  );
}