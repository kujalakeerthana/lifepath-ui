import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function StartBanner() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 text-indigo-600" />
        <div>
          <p className="text-sm font-semibold text-gray-800">Not sure where to start?</p>
          <p className="text-sm text-gray-600">Let LifePath pick opportunities that fit your profile.</p>
        </div>
      </div>
      <Link
        to="/dashboard/recommendations"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        See AI Recommendations
      </Link>
    </div>
  );
}