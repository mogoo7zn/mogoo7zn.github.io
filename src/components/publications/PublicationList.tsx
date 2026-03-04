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

export default function PublicationList() {
  const lang = useStore($lang);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (publications.length === 0) {
    return (
      <div className="text-center py-20">
        <BookOpen
          size={48}
          className="mx-auto mb-4 opacity-30"
          style={{ color: "var(--color-text-muted)" }}
        />
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          {ui.publications.noPubs[lang]}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {publications.map((pub, i) => {
        const isExpanded = expandedId === pub.id;

        return (
          <motion.article
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.4 }}
            className="rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Status & Year */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[pub.status]}`}
              >
                {statusLabel[pub.status][lang]}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {pub.year}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-semibold text-base md:text-lg leading-snug mb-2"
              style={{ color: "var(--color-text)" }}
            >
              {pub.title[lang]}
            </h3>

            {/* Authors */}
            <p
              className="text-sm mb-2 leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {pub.authors.map((a, j) => (
                <span key={j}>
                  {j > 0 && ", "}
                  <span
                    className={
                      a.isMe ? "font-semibold text-gradient" : undefined
                    }
                  >
                    {a.name}
                  </span>
                </span>
              ))}
            </p>

            {/* Venue */}
            <p
              className="text-sm italic mb-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              {pub.venue[lang]}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pub.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {pub.pdf && (
                <a
                  href={pub.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    color: "var(--color-primary)",
                    backgroundColor: "var(--color-bg-secondary)",
                  }}
                >
                  <FileText size={13} /> PDF
                </a>
              )}
              {pub.arxiv && (
                <a
                  href={pub.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    color: "var(--color-primary)",
                    backgroundColor: "var(--color-bg-secondary)",
                  }}
                >
                  <ExternalLink size={13} /> arXiv
                </a>
              )}
              {pub.doi && (
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    color: "var(--color-primary)",
                    backgroundColor: "var(--color-bg-secondary)",
                  }}
                >
                  <ExternalLink size={13} /> DOI
                </a>
              )}
              {pub.code && (
                <a
                  href={pub.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    color: "var(--color-primary)",
                    backgroundColor: "var(--color-bg-secondary)",
                  }}
                >
                  <Code2 size={13} /> Code
                </a>
              )}
            </div>

            {/* Abstract toggle */}
            {pub.abstract && (
              <>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                  className="inline-flex items-center gap-1 text-xs font-medium transition-colors mt-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {isExpanded
                    ? ui.publications.hideAbstract[lang]
                    : ui.publications.showAbstract[lang]}
                  {isExpanded ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-sm leading-relaxed mt-3 p-3 rounded-lg"
                        style={{
                          color: "var(--color-text-secondary)",
                          backgroundColor: "var(--color-bg-secondary)",
                        }}
                      >
                        {pub.abstract[lang]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.article>
        );
      })}
    </div>
  );
}
