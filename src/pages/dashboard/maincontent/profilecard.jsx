import { Link } from "react-router-dom";

export default function ProfileCompletionCard({ percent }) {
  const value = typeof percent === "number" ? Math.min(100, Math.max(0, percent)) : 0;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="flex-1">
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-gray-800">Profile completion</span>
          <span className="font-medium text-indigo-600">{value}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${value}%` }} />
        </div>
      </div>
      <Link
        to="/dashboard/profile"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Edit profile
      </Link>
    </div>
  );
}