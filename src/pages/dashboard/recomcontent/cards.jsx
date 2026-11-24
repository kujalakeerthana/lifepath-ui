import { Bookmark, ThumbsUp, ThumbsDown } from "lucide-react";

export default function RecoCard({ item, onView, onSave, onDismiss, onFeedback }) {
  const facts = [item.cost, item.mode, item.deadline ? `Deadline: ${item.deadline}` : null].filter(Boolean);

  const feedbackClass = (value) =>
    `transition ${item.feedback === value ? "text-indigo-600" : "text-gray-400 hover:text-indigo-600"}`;

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        {item.type ? (
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{item.type}</span>
        ) : (
          <span />
        )}
        {typeof item.match === "number" && (
          <span className="text-xs font-semibold text-green-600">{item.match}% match</span>
        )}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-gray-800">{item.title}</h3>

      {item.reason && (
        <p className="mt-1 text-xs text-gray-500">
          <span className="font-medium">Why for you:</span> {item.reason}
        </p>
      )}

      {facts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {facts.map((fact) => (
            <span key={fact} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
              {fact}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
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

      <div className="mt-3 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
        <button type="button" onClick={() => onDismiss?.(item)} className="transition hover:text-red-600">
          Not interested
        </button>
        <div className="flex items-center gap-2">
          <span>Helpful?</span>
          <button type="button" aria-label="Helpful" onClick={() => onFeedback?.(item, "yes")} className={feedbackClass("yes")}>
            <ThumbsUp className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Not helpful" onClick={() => onFeedback?.(item, "no")} className={feedbackClass("no")}>
            <ThumbsDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}