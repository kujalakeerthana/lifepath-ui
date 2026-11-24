import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExploreHead from "./header";
import ExploreSearch from "./search";
import ExploreCategories from "./category";
import ExploreFilters from "./filter";
import ResultsBar from "./result";
import OpportunityCard from "./oppcards";
import StartBanner from "./startbanner";
import { LoadingGrid, EmptyState, ErrorState } from "../recomcontent/states";

const FILTER_KEYS = ["type", "cost", "mode", "location", "deadline"];

export default function ExploreOpportunities() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState({ items: [], total: undefined, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  // Read the current values from the web address
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;
  const filterValues = Object.fromEntries(FILTER_KEYS.map((key) => [key, searchParams.get(key) || ""]));

  // Change values in the web address. Any change except the page resets to page 1.
  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === "" || value == null || value === "all") next.delete(key);
      else next.set(key, String(value));
    });
    if (!("page" in patch)) next.delete("page");
    setSearchParams(next);
  };

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams);
    FILTER_KEYS.forEach((key) => next.delete(key));
    next.delete("page");
    setSearchParams(next);
  };

  // Runs every time the web address changes (search, filters, sort, page)
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        // TODO: const result = await fetchOpportunities(Object.fromEntries(searchParams));
        // TODO: setData(result);
      } catch (err) {
        setError("Could not load opportunities. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchParams, reloadKey]);

  const selectedItem = data.items.find((i) => i.id === selectedId) || null;

  const handleSave = (item) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === item.id ? { ...i, saved: !i.saved } : i)),
    }));
    // TODO: save or unsave on the backend
  };

  const hasSearchOrFilters = Boolean(query) || category !== "all" || FILTER_KEYS.some((key) => filterValues[key]);

  return (
    <div className="space-y-6">
      <ExploreHead />
      <ExploreSearch value={query} onSearch={(text) => updateParams({ q: text })} />
      <ExploreCategories active={category} onChange={(key) => updateParams({ category: key })} />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filters on the left */}
        <div className="lg:col-span-1">
          <ExploreFilters values={filterValues} onChange={updateParams} onClear={clearFilters} />
        </div>

        {/* Results on the right */}
        <div className="space-y-4 lg:col-span-3">
          <ResultsBar total={data.total} sort={sort} onSortChange={(value) => updateParams({ sort: value })} />

          {loading ? (
            <LoadingGrid />
          ) : error ? (
            <ErrorState message={error} onRetry={() => setReloadKey((k) => k + 1)} />
          ) : data.items.length === 0 ? (
            <EmptyState
              message={
                hasSearchOrFilters
                  ? "No opportunities found. Try changing your search or filters."
                  : "No opportunities yet. They will appear here."
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {data.items.map((item) => (
                <OpportunityCard
                  key={item.id}
                  item={item}
                  onView={(i) => setSelectedId(i.id)}
                  onSave={handleSave}
                />
              ))}
            </div>
          )}

        </div>
      </div>

      <StartBanner />
    </div>
  );
}