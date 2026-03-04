import { atom } from "nanostores";

export type Lang = "zh" | "en";

export const $lang = atom<Lang>("zh");

export function initLang(): void {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("lang") as Lang | null;
  if (stored === "zh" || stored === "en") {
    $lang.set(stored);
  } else {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    $lang.set(browserLang.startsWith("zh") ? "zh" : "en");
  }
  $lang.subscribe((l) => {
    localStorage.setItem("lang", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  });
}

export function toggleLang(): void {
  $lang.set($lang.get() === "zh" ? "en" : "zh");
}
