import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function ThemeToggle() {
  const { dark, setDark } = useDarkMode();
  return (
    <button
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="inline-flex items-center gap-2 rounded-xl2 border border-ink-800 dark:border-ink-700 px-3 py-2 bg-card-light dark:bg-card-dark hover:opacity-90"
      onClick={() => setDark(!dark)}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm">
        {dark ? "Claro" : "Escuro"}
      </span>
    </button>
  );
}
