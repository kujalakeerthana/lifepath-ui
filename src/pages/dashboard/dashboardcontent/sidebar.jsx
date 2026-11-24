import { NavLink } from "react-router-dom";
import { LayoutDashboard, Sparkles, Compass, Bookmark, User, Settings, LogOut, X } from "lucide-react";

// Add or change menu items here
const MENU = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "AI Recommendations", to: "/dashboard/recommendations", icon: Sparkles },
  { label: "Explore Opportunities", to: "/dashboard/explore-opportunities", icon: Compass },
  { label: "Saved Opportunities", to: "/dashboard/saved", icon: Bookmark },
  { label: "My Profile", to: "/dashboard/profile", icon: User },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {/* Dark background behind the sidebar on mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
          <span className="text-xl font-bold text-indigo-600">LifePath</span>
          <button type="button" onClick={onClose} className="text-gray-500 lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu links */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {MENU.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}