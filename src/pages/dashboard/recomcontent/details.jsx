import { X, ExternalLink, Bookmark } from "lucide-react";

// A simple bullet list block. Hidden when the list is empty.
function ListBlock({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-5">
      <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
        {items.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default function RecoDetails({ item, onClose, onSave }) {
  if (!item) return null; // panel is closed

  return (
    <>
      {/* Dark background */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-200 p-5">
          <div>
            {item.type && (
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{item.type}</span>
            )}
            <h2 className="mt-2 text-lg font-bold text-gray-800">{item.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {item.description && <p className="text-sm text-gray-600">{item.description}</p>}

          <ListBlock title="Who can apply" items={item.eligibility} />
          <ListBlock title="Benefits" items={item.benefits} />
          <ListBlock title="Documents required" items={item.documents} />

          {item.steps && item.steps.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-gray-800">How to apply</h4>
              <ol className="mt-3 space-y-3">
                {item.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex gap-3 border-t border-gray-200 p-5">
          <button
            type="button"
            onClick={() => onSave?.(item)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-indigo-400"
          >
            <Bookmark className={`h-4 w-4 ${item.saved ? "fill-indigo-600 text-indigo-600" : ""}`} />
            {item.saved ? "Saved" : "Save"}
          </button>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Official link <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </aside>
    </>
  );
}