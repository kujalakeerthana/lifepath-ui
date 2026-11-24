import { Link } from "react-router-dom";

export default function ProfileStrip({ tags = [] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white p-4 shadow-sm">
      <span className="text-sm font-medium text-gray-700">Based on your profile:</span>

      {tags.length === 0 ? (
        <span className="text-sm text-gray-400">Your profile details will appear here.</span>
      ) : (
        tags.map((tag, index) => (
          <span key={`${tag}-${index}`} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            {tag}
          </span>
        ))
      )}

      <Link to="/dashboard/profile" className="ml-auto text-sm font-medium text-indigo-600 hover:underline">
        Edit profile
      </Link>
    </div>
  );
}