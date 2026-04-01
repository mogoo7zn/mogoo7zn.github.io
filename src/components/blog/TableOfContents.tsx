import React, { useEffect, useState } from "react";

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({
  headings = [],
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Filter out h1 usually, just keep H2 and H3
  const tocHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3);

  useEffect(() => {
    if (tocHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find whichever intersecting element is highest up the page
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by their top bound?
          const sorted = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    tocHeadings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [tocHeadings]);

  if (tocHeadings.length === 0) return null;

  return (
    <nav
      className="w-full overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-hide pr-2"
      aria-label="Table of Contents"
    >
      <div
        className="mb-4 text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--color-text-muted)" }}
      >
        On this page
      </div>

      <div className="relative border-l border-[var(--color-border)] ml-1 pl-4 py-1">
        <ul className="flex flex-col gap-3 relative z-10">
          {tocHeadings.map((heading) => {
            const isActive = activeId === heading.slug;
            return (
              <li
                key={heading.slug}
                className={`relative transition-all duration-300 ${heading.depth === 3 ? "ml-4 text-[0.8rem]" : "text-[0.85rem]"}`}
              >
                <a
                  href={`#${heading.slug}`}
                  className={`block transition-all duration-200 hover:text-[var(--color-primary)] ${
                    isActive ? "font-medium" : ""
                  }`}
                  style={{
                    color: isActive
                      ? "var(--color-primary)"
                      : "var(--color-text-muted)",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(heading.slug)
                      ?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", `#${heading.slug}`);
                    setActiveId(heading.slug);
                  }}
                >
                  {heading.text}
                </a>

                {/* Active Indicator Line */}
                {isActive && (
                  <div
                    className="absolute left-[-16px] top-0 w-[2px] h-full transition-all duration-300 rounded"
                    style={{ background: "var(--color-primary)" }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
