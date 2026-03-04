import { useStore } from "@nanostores/react";
import { $lang, type Lang } from "./store";

/** Get a bilingual value based on current language */
export function useT<T>(obj: { zh: T; en: T }): T {
  const lang = useStore($lang);
  return obj[lang];
}

/** Hook returning the current language */
export function useLang(): Lang {
  return useStore($lang);
}

/** Helper: pick value from bilingual object */
export function t<T>(obj: { zh: T; en: T }, lang: Lang): T {
  return obj[lang];
}
