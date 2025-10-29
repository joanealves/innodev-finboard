import { LogOut, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import ThemeToggle from "../common/ThemeToggle";

export default function Sidebar() {
  const logout = useAuth(s => s.logout);
  return (
    <aside className="w-64 shrink-0 h-full bg-card-light dark:bg-card-dark border-r border-ink-200 dark:border-ink-800 flex flex-col">
      <div className="p-4 border-b border-ink-200 dark:border-ink-800 flex items-center justify-between">
        <h1 className="font-semibold">FinBoard</h1>
        <ThemeToggle />
      </div>
      <nav className="p-3 flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl2 hover:bg-ink-50 dark:hover:bg-ink-900 ${isActive
                  ? "bg-ink-50 dark:bg-ink-900"
                  : ""}`}
            >
              <Home size={18} /> Home
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-3 border-t border-ink-200 dark:border-ink-800">
        <button
          onClick={logout}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl2 border border-ink-300 dark:border-ink-700 hover:bg-ink-50 dark:hover:bg-ink-900"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
