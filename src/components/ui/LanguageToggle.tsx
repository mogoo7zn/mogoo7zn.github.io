import { useStore } from "@nanostores/react";
import { $lang, toggleLang } from "@/i18n/store";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const lang = useStore($lang);

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
      style={{
        color: "var(--color-text-secondary)",
        border: "1px solid var(--color-border)",
      }}
      aria-label="Toggle language"
    >
      <Languages size={14} />
      <span>{lang === "zh" ? "EN" : "中文"}</span>
    </button>
  );
}
