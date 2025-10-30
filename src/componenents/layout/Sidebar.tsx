import { BarChart3, Home, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/store/authStore";

export default function Sidebar() {
  const logout = useAuth(s => s.logout);

  const linkBase =
    "group flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-colors";
  const active =
    "bg-[oklch(var(--sidebar-accent)/20%)] text-[oklch(var(--sidebar-primary))]";
  const idle =
    "text-sidebar-foreground/80 hover:bg-[oklch(var(--sidebar-accent)/12%)]";

  return (
    <div className="flex h-full w-full flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[oklch(var(--sidebar-primary)/20%)]">
            <BarChart3 size={18} className="text-[oklch(var(--sidebar-primary))]" />
          </div>
          <span className="font-semibold">FinBoard</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}
        >
          <Home size={16} />
          <span>Dashboard</span>
        </NavLink>
      </nav>

      {/* Sair */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-[oklch(var(--border))] hover:bg-[oklch(var(--sidebar-accent)/10%)]"
        >
          <LogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
