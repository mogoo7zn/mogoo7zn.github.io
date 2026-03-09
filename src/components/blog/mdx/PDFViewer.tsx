import React from "react";
import { FileText, Download, ExternalLink } from "lucide-react";

interface PDFViewerProps {
  url: string;
  title?: string;
  height?: string;
}

export default function PDFViewer({
  url,
  title = "PDF Document",
  height = "700px",
}: PDFViewerProps) {
  return (
    <div
      className="w-full my-8 flex flex-col rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg-secondary)",
        }}
      >
        <div
          className="flex items-center gap-2 font-medium"
          style={{ color: "var(--color-text)" }}
        >
          <FileText
            className="w-4 h-4 sm:w-5 sm:h-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="text-sm sm:text-base truncate max-w-[150px] sm:max-w-md">
            {title}
          </span>
        </div>
        <div className="flex gap-2">
          <a
            href={url}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
            title="Download PDF"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors rounded-md hover:opacity-90"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
            }}
            title="Open in new tab"
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Fullscreen</span>
          </a>
        </div>
      </div>

      <div
        className="relative w-full"
        style={{ height, backgroundColor: "#525659" }}
      >
        <iframe
          src={`${url}#toolbar=0&view=FitH`}
          className="w-full h-full border-0"
          title={title}
        >
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <p className="mb-4" style={{ color: "#fff" }}>
              Unable to display PDF directly.
            </p>
            <a
              href={url}
              className="px-4 py-2 rounded-md hover:opacity-90 transition-colors"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
              }}
            >
              Download PDF to view
            </a>
          </div>
        </iframe>
      </div>
    </div>
  );
}
