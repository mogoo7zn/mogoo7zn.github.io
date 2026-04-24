import { atom } from "nanostores";

export type Theme = "system" | "light" | "dark";

export const $theme = atom<Theme>("system");

const STORAGE_KEY = "theme";
let initialized = false;
let cleanupSystemListener: (() => void) | null = null;

export function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "light" || theme === "dark") return theme;
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Call once on client to sync theme from localStorage / system preference */
export function initTheme(): void {
  if (typeof window === "undefined" || initialized) return;

  initialized = true;

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "system" || stored === "light" || stored === "dark") {
    $theme.set(stored);
  } else {
    $theme.set("system");
  }
  applyTheme($theme.get());
  bindSystemThemeListener();

  $theme.subscribe((t) => {
    applyTheme(t);
    if (t === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, t);
    }
  });
}

export function toggleTheme(): void {
  const order: Theme[] = ["system", "light", "dark"];
  const currentIndex = order.indexOf($theme.get());
  $theme.set(order[(currentIndex + 1) % order.length]);
}

function applyTheme(t: Theme): void {
  const doc = document.documentElement;
  if (resolveTheme(t) === "dark") {
    doc.classList.add("dark");
  } else {
    doc.classList.remove("dark");
  }
}

function bindSystemThemeListener(): void {
  if (typeof window === "undefined") return;

  cleanupSystemListener?.();

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    if ($theme.get() === "system") {
      applyTheme("system");
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onChange);
    cleanupSystemListener = () =>
      mediaQuery.removeEventListener("change", onChange);
    return;
  }

  mediaQuery.addListener(onChange);
  cleanupSystemListener = () => mediaQuery.removeListener(onChange);
}
