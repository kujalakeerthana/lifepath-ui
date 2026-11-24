import { Bookmark, Sparkles } from "lucide-react";

export default function BestMatch({ item, onView, onSave }) {
  if (!item) return null; // nothing to show until the AI sends a best match

  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
      <p className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
        <Sparkles className="h-4 w-4" /> Best match for your goal
      </p>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            {item.type && (
              <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-indigo-700">{item.type}</span>
            )}
            {typeof item.match === "number" && (
              <span className="text-xs font-semibold text-green-600">{item.match}% match</span>
            )}
          </div>
          <h2 className="mt-2 text-lg font-bold text-gray-800">{item.title}</h2>
          {item.reason && (
            <p className="mt-1 text-sm text-gray-600">
              <span className="font-medium">Why for you:</span> {item.reason}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onView?.(item)}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View details
          </button>
          <button
            type="button"
            onClick={() => onSave?.(item)}
            aria-label="Save"
            className="rounded-lg border border-indigo-300 bg-white px-3 text-indigo-700 transition hover:border-indigo-500"
          >
            <Bookmark className={`h-4 w-4 ${item.saved ? "fill-indigo-600" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}