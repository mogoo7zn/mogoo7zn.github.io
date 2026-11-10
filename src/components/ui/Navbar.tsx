import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { homepage } from "@/data/homepage";
import { profile } from "@/data/profile";
import { ui } from "@/i18n/ui";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { initTheme } from "@/stores/theme";
import { initLang } from "@/i18n/store";

const sectionItems = homepage.sections.map(section => ({
  key: section.id,
  href: `/#${section.id}`,
  label: section.label,
}));

const pageItems = [
  { key: "projects" as const, href: "/projects" },
  { key: "publications" as const, href: "/publications" },
  { key: "blog" as const, href: "/blog" },
];

export default function Navbar() {
  const lang = useStore($lang);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    initTheme();
    initLang();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (!sections.length) return;
    let frame = 0;
    const updateActiveSection = () => {
      const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const current = atBottom
        ? sections[sections.length - 1]
        : [...sections].reverse().find(section => section.getBoundingClientRect().top <= 140);
      setActiveSection(current?.id ?? "");
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-4">
      <div
        className={`mx-auto max-w-7xl overflow-hidden rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "glass shadow-[var(--shadow-soft)]"
            : "bg-[color-mix(in_srgb,var(--color-bg-card)_72%,transparent)]"
        }`}
        style={{
          borderColor: scrolled
            ? "color-mix(in srgb, var(--color-border) 88%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? undefined : "blur(10px)",
        }}
      >


        <div className="relative z-10 flex h-16 items-center justify-between px-4 sm:px-6">
          <a href="/" className="shrink-0 flex items-center gap-2 group">
            <img src={profile.avatar} alt="" width="36" height="36" className="theme-avatar-light h-9 w-9 object-contain" />
            <img src={profile.avatarDark} alt="" width="36" height="36" className="theme-avatar-dark h-9 w-9 object-contain" />
            <span className="text-base font-semibold tracking-tight" style={{ color: 'var(--color-text)' }}>{profile.realName.en}</span>
          </a>

          <div
            className="hidden items-center gap-1 rounded-full border px-2 py-1.5 lg:flex"
            style={{
              borderColor: "color-mix(in srgb, var(--color-border) 86%, transparent)",
              background:
                "color-mix(in srgb, var(--color-bg-secondary) 84%, transparent)",
            }}
          >
            {sectionItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200"
                style={{
                  color:
                    activeSection === item.key
                      ? "var(--color-bg)"
                      : "var(--color-text-secondary)",
                  background:
                    activeSection === item.key
                      ? "var(--color-primary)"
                      : "transparent",
                  boxShadow:
                    activeSection === item.key
                      ? "none"
                      : "none",
                }}
              >
                {item.label[lang]}
              </a>
            ))}

            <span
              className="mx-1.5 h-4 w-px shrink-0"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            {pageItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:bg-[var(--color-bg-card)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {ui.nav[item.key][lang]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              className="rounded-xl border p-2 lg:hidden"
              style={{
                color: "var(--color-text-secondary)",
                borderColor: "var(--color-border)",
                background:
                  "color-mix(in srgb, var(--color-bg-secondary) 82%, transparent)",
              }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border glass lg:hidden"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="space-y-1 px-4 py-3">
            {sectionItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-bg-secondary)]"
                style={{
                  color:
                    activeSection === item.key
                      ? "var(--color-primary)"
                      : "var(--color-text-secondary)",
                }}
              >
                {item.label[lang]}
              </a>
            ))}

            <div
              className="my-2 h-px"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            {pageItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-bg-secondary)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {ui.nav[item.key][lang]}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
