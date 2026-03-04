import { useStore } from "@nanostores/react";
import { $theme, toggleTheme } from "@/stores/theme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const theme = useStore($theme);

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-all duration-300 hover:scale-110"
      style={{ color: "var(--color-text-secondary)" }}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
