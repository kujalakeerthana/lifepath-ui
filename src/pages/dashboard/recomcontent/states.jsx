import { AlertCircle, Inbox } from "lucide-react";

export function LoadingGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-full rounded bg-gray-200" />
          <div className="mt-6 h-9 w-full rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
      <Inbox className="h-8 w-8 text-gray-400" />
      <p className="mt-3 text-sm text-gray-500">{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-red-200 bg-red-50 py-12 text-center">
      <AlertCircle className="h-8 w-8 text-red-500" />
      <p className="mt-3 text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
}