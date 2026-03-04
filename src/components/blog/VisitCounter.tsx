import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { supabase, getFingerprint } from "@/lib/supabase";

interface VisitCounterProps {
  pagePath: string;
  showTotal?: boolean;
  className?: string;
}

export default function VisitCounter({
  pagePath,
  showTotal = false,
  className = "",
}: VisitCounterProps) {
  const lang = useStore($lang);
  const [count, setCount] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const sessionKey = `viewed_${pagePath}`;
    const alreadyViewed = sessionStorage.getItem(sessionKey);

    async function track() {
      try {
        if (!alreadyViewed) {
          // First visit in this session → increment
          const { data } = await supabase!.rpc("increment_page_view", {
            p_path: pagePath,
          });
          if (typeof data === "number") setCount(data);
          sessionStorage.setItem(sessionKey, "1");
        } else {
          // Already counted → just fetch
          const { data } = await supabase!.rpc("get_page_views", {
            p_path: pagePath,
          });
          if (typeof data === "number") setCount(data);
        }

        if (showTotal) {
          const { data } = await supabase!.rpc("get_total_views");
          if (typeof data === "number") setTotal(data);
        }
      } catch (err) {
        console.error("Visit counter error:", err);
      }
    }

    track();
  }, [pagePath, showTotal]);

  if (count === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm ${className}`}
      style={{ color: "var(--color-text-secondary)" }}
    >
      {/* Eye icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>
        {ui.visitCounter.views[lang]}: {count.toLocaleString()}
      </span>
      {showTotal && total !== null && (
        <span
          className="ml-2 pl-2 border-l"
          style={{ borderColor: "var(--color-border)" }}
        >
          {ui.visitCounter.totalViews[lang]}: {total.toLocaleString()}
        </span>
      )}
    </span>
  );
}
