import { atom } from "nanostores";

export type Lang = "zh" | "en";

export const $lang = atom<Lang>("en");

export function initLang(): void {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("lang") as Lang | null;
  if (stored === "zh" || stored === "en") {
    $lang.set(stored);
  }
  $lang.subscribe((l) => {
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  });
}

export function toggleLang(): void {
  const lang = $lang.get() === "zh" ? "en" : "zh";
  $lang.set(lang);
  localStorage.setItem("lang", lang);
}
