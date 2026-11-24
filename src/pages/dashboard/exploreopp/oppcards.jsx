import { Bookmark } from "lucide-react";

export default function OpportunityCard({ item, onView, onSave }) {
  const facts = [item.cost, item.mode, item.location, item.deadline ? `Deadline: ${item.deadline}` : null].filter(Boolean);

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {item.type && (
        <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
          {item.type}
        </span>
      )}

      <h3 className="mt-3 text-sm font-semibold text-gray-800">{item.title}</h3>
      {item.provider && <p className="mt-0.5 text-xs text-gray-500">by {item.provider}</p>}
      {item.description && <p className="mt-2 text-xs text-gray-600">{item.description}</p>}

      {facts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {facts.map((fact) => (
            <span key={fact} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {fact}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex gap-2 pt-4">
        <button
          type="button"
          onClick={() => onView?.(item)}
          className="flex-1 rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
        >
          View details
        </button>
        <button
          type="button"
          onClick={() => onSave?.(item)}
          aria-label="Save"
          className="rounded-lg border border-gray-300 px-3 text-gray-600 transition hover:border-indigo-400"
        >
          <Bookmark className={`h-4 w-4 ${item.saved ? "fill-indigo-600 text-indigo-600" : ""}`} />
        </button>
      </div>
    </div>
  );
}