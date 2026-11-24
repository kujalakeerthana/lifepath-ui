import { Menu, Search, Bell } from "lucide-react";

export default function Topbar({ onMenuClick, userName = "User" }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Menu button (only on mobile) */}
      <button type="button" onClick={onMenuClick} className="text-gray-600 lg:hidden" aria-label="Open menu">
        <Menu className="h-6 w-6" />
      </button>

      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search schemes, jobs, courses..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Notifications */}
        <button type="button" className="relative text-gray-600 hover:text-indigo-600" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </span>
          <span className="hidden text-sm font-medium text-gray-700 sm:block">{userName}</span>
        </div>
      </div>
    </header>
  );
}