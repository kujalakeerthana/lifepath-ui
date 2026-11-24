import { RefreshCw } from "lucide-react";

export default function RecoHeader({ onRefresh, refreshing }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">AI Recommendations</h1>
        <p className="mt-1 text-sm text-gray-500">Picked for your profile</p>
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-indigo-400 disabled:opacity-60"
      >
        <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}