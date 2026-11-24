import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

// Each option is [value saved in the web address, label shown to the user]
const GROUPS = [
  {
    name: "type",
    label: "Type",
    options: [["scheme", "Scheme"], ["job", "Job"], ["course", "Course"], ["scholarship", "Scholarship"], ["loan", "Loan"]],
  },
  { name: "cost", label: "Cost", options: [["free", "Free"], ["low", "Low-cost"], ["paid", "Paid"]] },
  { name: "mode", label: "Mode", options: [["online", "Online"], ["offline", "Offline"]] },
  {
    name: "location",
    label: "Location",
    options: [["nearby", "Nearby"], ["state", "Within my state"], ["india", "Anywhere in India"]],
  },
  {
    name: "deadline",
    label: "Deadline",
    options: [["week", "This week"], ["month", "This month"], ["quarter", "Next 3 months"]],
  },
];

export default function ExploreFilters({ values = {}, onChange, onClear }) {
  const [open, setOpen] = useState(false); // used on mobile only
  const activeCount = GROUPS.filter((g) => values[g.name]).length;

  return (
    <div>
      {/* Filters button (mobile only) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl bg-white p-4 text-sm font-semibold text-gray-800 shadow-sm lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Filters panel (always visible on big screens) */}
      <div className={`${open ? "block" : "hidden"} mt-3 space-y-5 rounded-xl bg-white p-4 shadow-sm lg:mt-0 lg:block`}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">Filters</h2>
          <button type="button" onClick={onClear} className="text-xs font-medium text-indigo-600 hover:underline">
            Clear filters
          </button>
        </div>

        {GROUPS.map((group) => (
          <div key={group.name}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.options.map(([value, label]) => {
                const selected = values[group.name] === value;
                return (
                  <button
                    type="button"
                    key={value}
                    // clicking a selected option again turns it off
                    onClick={() => onChange({ [group.name]: selected ? "" : value })}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      selected
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-indigo-400"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}