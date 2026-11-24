export default function ResultsBar({ total, sort = "newest", onSortChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-medium text-gray-700">
        {typeof total === "number" ? `${total} ${total === 1 ? "opportunity" : "opportunities"}` : "Opportunities"}
      </p>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        Sort by
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="newest">Newest</option>
          <option value="deadline">Deadline soon</option>
          <option value="az">A to Z</option>
        </select>
      </label>
    </div>
  );
}