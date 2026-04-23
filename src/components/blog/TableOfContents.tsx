import React, { useEffect, useRef, useState } from "react";
import { List, X } from "lucide-react";

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  isMobile?: boolean;
}

export default function TableOfContents({
  headings = [],
  isMobile = false,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  if (tocHeadings.length === 0) return null;

  const tocContent = (
    <nav
      className={`toc-scrollbar w-full overflow-y-auto overscroll-contain max-h-[calc(100vh-8rem)] ${isMobile ? "pr-3" : "pr-1"}`}
      style={{ scrollbarGutter: "stable" }}
      data-scrolling={isScrolling ? "true" : "false"}
      onScroll={() => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current !== null) {
          window.clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, 700);
      }}
      aria-label="Table of Contents"
    >
      {!isMobile && (
        <div
          className="mb-4 text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--color-text-muted)" }}
        >
          On this page
        </div>
      )}

      <div
        className={`relative border-l border-[var(--color-border)] ml-1 ${isMobile ? "pl-6 py-2" : "pl-4 py-1"}`}
      >
        <ul className="flex flex-col gap-4 relative z-10">
          {tocHeadings.map((heading) => {
            const isActive = activeId === heading.slug;
            return (
              <li
                key={heading.slug}
                className={`relative transition-all duration-300 ${heading.depth === 3 ? "ml-4 text-[0.85rem]" : "text-[0.95rem]"}`}
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
                    const element = document.getElementById(heading.slug);
                    if (element) {
                      const y =
                        element.getBoundingClientRect().top +
                        window.scrollY -
                        100;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                    window.history.pushState(null, "", `#${heading.slug}`);
                    setActiveId(heading.slug);
                    if (isMobile) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {heading.text}
                </a>

                {/* Active Indicator Line */}
                {isActive && (
                  <div
                    className="absolute left-[-24px] md:left-[-16px] top-0 w-[2px] h-full transition-all duration-300 rounded pointer-events-none"
                    style={{
                      background: "var(--color-primary)",
                      left: isMobile ? "-25px" : "-17px",
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );

  if (isMobile) {
    return (
      <>
        {/* Floating Button for Mobile TOC */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 md:right-8 z-50 p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center opacity-90 hover:opacity-100"
          style={{
            background: "var(--color-bg-secondary)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-border)",
          }}
          aria-label="Open Table of Contents"
        >
          <List size={22} />
        </button>

        {/* Backdrop overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Slide-out Drawer */}
        <div
          className={`fixed inset-y-0 right-0 z-[70] w-72 md:w-80 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "var(--color-bg)" }}
        >
          <div className="flex justify-between items-center p-5 border-b border-[var(--color-border)]">
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              Contents
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors"
              style={{ color: "var(--color-text)" }}
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">{tocContent}</div>
        </div>
      </>
    );
  }

  return tocContent;
}
