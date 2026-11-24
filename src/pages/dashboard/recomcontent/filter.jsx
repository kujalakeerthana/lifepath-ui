const CATEGORY_TABS = [
  { key: "all", label: "All" },
  { key: "education", label: "Education & Scholarships" },
  { key: "jobs", label: "Jobs & Internships" },
  { key: "skills", label: "Skill Development" },
  { key: "schemes", label: "Government Schemes" },
  { key: "finance", label: "Financial Assistance" },
  { key: "health", label: "Health & Insurance" },
];

export default function RecoFilters({ filters, onChange }) {
  return (
    <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_TABS.map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => onChange({ category: tab.key })}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              filters.category === tab.key
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-gray-300 text-gray-700 hover:border-indigo-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sort and quick filters */}
      <div className="flex flex-wrap items-center gap-5 text-sm text-gray-700">
        <label className="flex items-center gap-2">
          Sort by
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="match">Best match</option>
            <option value="deadline">Deadline soon</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.freeOnly}
            onChange={(e) => onChange({ freeOnly: e.target.checked })}
            className="h-4 w-4 accent-indigo-600"
          />
          Free only
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.onlineOnly}
            onChange={(e) => onChange({ onlineOnly: e.target.checked })}
            className="h-4 w-4 accent-indigo-600"
          />
          Online only
        </label>
      </div>
    </div>
  );
}