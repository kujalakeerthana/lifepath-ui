import { Link } from "react-router-dom";

export default function SectionCard({ title, actionLabel, actionTo, isEmpty, emptyText, children }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        {actionLabel && actionTo && (
          <Link to={actionTo} className="text-sm font-medium text-indigo-600 hover:underline">
            {actionLabel}
          </Link>
        )}
      </div>

      <div className="mt-4">
        {isEmpty ? (
          <p className="rounded-lg border border-dashed border-gray-300 py-6 text-center text-sm text-gray-500">
            {emptyText}
          </p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}