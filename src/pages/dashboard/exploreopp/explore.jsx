export default function ExplorePagination({ page = 1, totalPages = 1, onChange }) {
  if (totalPages <= 1) return null; // nothing to page through

  // show up to 5 page numbers around the current page
  const end = Math.min(totalPages, Math.max(1, page - 2) + 4);
  const pages = [];
  for (let p = Math.max(1, end - 4); p <= end; p++) pages.push(p);

  const buttonClass =
    "rounded-lg border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={`${buttonClass} border-gray-300 bg-white text-gray-700 hover:border-indigo-400`}
      >
        Previous
      </button>

      {pages.map((p) => (
        <button
          type="button"
          key={p}
          onClick={() => onChange(p)}
          className={`${buttonClass} ${
            p === page
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={`${buttonClass} border-gray-300 bg-white text-gray-700 hover:border-indigo-400`}
      >
        Next
      </button>
    </div>
  );
}