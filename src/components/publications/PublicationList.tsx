import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { publications, type Publication } from "@/data/publications";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ExternalLink,
  Code2,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";

const statusColor: Record<Publication["status"], string> = {
  published: "bg-green-500/15 text-green-600 dark:text-green-400",
  preprint: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "under-review": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
};

const statusLabel: Record<Publication["status"], { zh: string; en: string }> = {
  published: { zh: "已发表", en: "Published" },
  preprint: { zh: "预印本", en: "Preprint" },
  "under-review": { zh: "审稿中", en: "Under Review" },
};

export default function PublicationList({
  pubs = publications,
}: {
  pubs?: typeof publications;
}) {
  const lang = useStore($lang);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (pubs.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center">
        <BookOpen
          size={56}
          className="mb-4 opacity-20"
          style={{ color: "var(--color-text-muted)" }}
        />
        <p
          className="text-lg font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {ui.publications.noPubs[lang]}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pubs.map((pub, i) => {
        const isExpanded = expandedId === pub.id;

        return (
          <motion.article
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.4 }}
            className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Ambient Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Status & Year */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${statusColor[pub.status]}`}
                  >
                    {statusLabel[pub.status][lang]}
                  </span>
                  <span
                    className="text-sm font-medium tracking-wide"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {pub.year}
                  </span>
                </div>
              </div>

              {/* Title */}
              <a href={`/publications/${pub.id}`} className="block mb-3">
                <h3
                  className="font-bold text-xl md:text-2xl leading-tight transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500"
                  style={{ color: "var(--color-text)" }}
                >
                  {pub.title[lang]}
                </h3>
              </a>

              {/* Authors */}
              <p
                className="text-sm md:text-base mb-4 leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {pub.authors.map((a, j) => (
                  <span key={j}>
                    {j > 0 && ", "}
                    <span
                      className={
                        a.isMe ? "font-bold text-gradient" : "font-medium"
                      }
                    >
                      {a.name}
                    </span>
                  </span>
                ))}
              </p>

              {/* Venue */}
              <div className="flex items-start gap-2 mb-5">
                <BookOpen
                  size={18}
                  className="mt-0.5 opacity-60"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <p
                  className="text-sm font-medium italic"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {pub.venue[lang]}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-md"
                    style={{
                      backgroundColor: "var(--color-bg-secondary)",
                      color: "var(--color-text-secondary)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    # {tag}
                  </span>
                ))}
              </div>

              {/* Links & Expand */}
              <div
                className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-dashed"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a
                    href={`/publications/${pub.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      color: "white",
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    }}
                  >
                    <BookOpen size={16} />{" "}
                    {lang === "zh" ? "阅读详情" : "Read More"}
                  </a>
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                      style={{
                        color: "var(--color-text)",
                        backgroundColor: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <FileText size={16} /> PDF
                    </a>
                  )}
                  {pub.arxiv && (
                    <a
                      href={pub.arxiv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                      style={{
                        color: "var(--color-text)",
                        backgroundColor: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <ExternalLink size={16} /> arXiv
                    </a>
                  )}
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                      style={{
                        color: "var(--color-text)",
                        backgroundColor: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <ExternalLink size={16} /> DOI
                    </a>
                  )}
                  {pub.code && (
                    <a
                      href={pub.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                      style={{
                        color: "var(--color-text)",
                        backgroundColor: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <Code2 size={16} /> Code
                    </a>
                  )}
                </div>

                {pub.abstract && (
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors pt-4 hover:opacity-80"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {isExpanded
                      ? ui.publications.hideAbstract[lang]
                      : ui.publications.showAbstract[lang]}
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>

              {/* Abstract toggle content */}
              {pub.abstract && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <div
                        className="text-sm md:text-base leading-relaxed p-5 rounded-xl relative overflow-hidden"
                        style={{
                          color: "var(--color-text-secondary)",
                          backgroundColor: "var(--color-bg-secondary)",
                          borderLeft: "3px solid var(--color-primary)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
                        <p className="relative z-10">{pub.abstract[lang]}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
