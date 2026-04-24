import { useStore } from "@nanostores/react";
import { $theme, resolveTheme, toggleTheme } from "@/stores/theme";
import { Monitor, Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const theme = useStore($theme);
  const resolved = resolveTheme(theme);

  const Icon =
    theme === "system" ? Monitor : theme === "dark" ? Sun : Moon;

  const title =
    theme === "system"
      ? `Follow system (${resolved === "dark" ? "currently dark" : "currently light"})`
      : theme === "light"
        ? "Switch to dark theme"
        : "Switch to system theme";

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-all duration-300 hover:scale-110"
      style={{ color: "var(--color-text-secondary)" }}
      aria-label="Toggle theme"
      title={title}
    >
      <Icon size={18} />
    </button>
  );
}
