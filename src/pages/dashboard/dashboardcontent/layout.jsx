import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useAuth } from "../../../context/AuthContext";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // used on mobile
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

      {/* lg:pl-64 leaves space for the sidebar on big screens */}
      <div className="lg:pl-64">
        <Topbar onMenuClick={() => setSidebarOpen(true)} userName={user?.name || "User"} />

        {/* The page for the clicked menu item appears here */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}