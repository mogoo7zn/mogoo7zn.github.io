import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Construction, Clock } from "lucide-react";

interface DraftNoticeProps {
  title: string;
}

export default function DraftNotice({ title }: DraftNoticeProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full bg-[var(--color-bg-card)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 md:p-12 overflow-hidden"
      >
        {/* Decorative scanner line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" />

        <div className="flex flex-col items-center text-center">
          <div className="mb-8 p-6 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] relative group">
            <div className="absolute inset-0 rounded-full bg-[var(--color-primary)]/20 blur-md group-hover:blur-lg transition-all duration-500" />
            <Construction
              size={48}
              className="text-[var(--color-primary)] relative z-10"
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text-secondary)]">
            Work in Progress
          </h1>

          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent mb-8" />

          <div className="space-y-4 max-w-lg mx-auto text-[var(--color-text-secondary)] mb-10">
            <p className="text-lg">
              The project{" "}
              <span className="text-[var(--color-primary)] font-medium">
                "{title}"
              </span>{" "}
              is currently being documented.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm bg-[var(--color-bg-secondary)] py-2 px-4 rounded-full border border-[var(--color-border)] w-fit mx-auto">
              <Clock size={14} />
              <span>Estimated completion: Coming Soon</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="/projects"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Projects
              </span>
            </a>

            <a
              href="/"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                Home
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
