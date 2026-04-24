import { atom } from "nanostores";

export type Theme = "light" | "dark";

export const $theme = atom<Theme>("light");

/** Call once on client to sync theme from localStorage / system preference */
export function initTheme(): void {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") {
    $theme.set(stored);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    $theme.set(prefersDark ? "dark" : "light");
  }
  applyTheme($theme.get());

  $theme.subscribe((t) => {
    applyTheme(t);
    localStorage.setItem("theme", t);
  });
}

export function toggleTheme(): void {
  $theme.set($theme.get() === "dark" ? "light" : "dark");
}

function applyTheme(t: Theme): void {
  const doc = document.documentElement;
  if (t === "dark") {
    doc.classList.add("dark");
  } else {
    doc.classList.remove("dark");
  }
}
