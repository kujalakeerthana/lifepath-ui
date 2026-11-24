const TABS = [
  { key: "all", label: "All" },
  { key: "education", label: "Education & Scholarships" },
  { key: "jobs", label: "Jobs & Internships" },
  { key: "skills", label: "Skill Development" },
  { key: "schemes", label: "Government Schemes" },
  { key: "finance", label: "Financial Assistance" },
  { key: "health", label: "Health & Insurance" },
];

export default function ExploreCategories({ active = "all", onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <button
          type="button"
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
            active === tab.key
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}