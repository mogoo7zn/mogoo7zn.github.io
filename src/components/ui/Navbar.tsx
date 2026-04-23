import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { initTheme } from "@/stores/theme";
import { initLang } from "@/i18n/store";

const sectionItems = [
  { key: "about" as const, href: "/#about" },
  { key: "skills" as const, href: "/#skills" },
  { key: "timeline" as const, href: "/#timeline" },
  { key: "cv" as const, href: "/#cv" },
];

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
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
        <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(var(--color-primary-rgb),0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(var(--color-accent-rgb),0.06),transparent_24%)] opacity-50" />

        <div className="relative z-10 flex h-16 items-center justify-between px-4 sm:px-6">
          <a href="/" className="shrink-0 flex items-center gap-2 group">
            <svg
              width="48"
              height="48"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[var(--color-primary)]"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0"
                  y1="0"
                  x2="300"
                  y2="300"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="var(--color-primary)">
                    <animate
                      attributeName="stop-color"
                      values="var(--color-primary);var(--color-accent);var(--color-primary)"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="1" stopColor="var(--color-accent)">
                    <animate
                      attributeName="stop-color"
                      values="var(--color-accent);var(--color-primary);var(--color-accent)"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>
              <circle
                cx="150"
                cy="150"
                r="34"
                stroke="url(#logo-gradient)"
                strokeWidth="16"
                fill="none"
              />
              <polyline
                points="33.15,133.58 92.00,92.00 150.00,116.00 208.00,92.00 266.85,133.58"
                stroke="url(#logo-gradient)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span
              className="hidden text-lg font-semibold sm:inline"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-text) 0%, var(--color-primary) 50%, var(--color-text) 100%)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                animation: "shine 3s linear infinite",
              }}
            >
              MOGOO
            </span>
            <style>{`
              @keyframes shine {
                to {
                  background-position: 200% center;
                }
              }
            `}</style>
          </a>

          <div
            className="hidden items-center gap-1 rounded-full border px-2 py-1.5 md:flex"
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
                      ? "white"
                      : "var(--color-text-secondary)",
                  background:
                    activeSection === item.key
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-accent))"
                      : "transparent",
                  boxShadow:
                    activeSection === item.key
                      ? "0 10px 24px var(--color-glow)"
                      : "none",
                }}
              >
                {ui.nav[item.key][lang]}
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
              className="rounded-xl border p-2 md:hidden"
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
          className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border glass md:hidden"
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
                {ui.nav[item.key][lang]}
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
