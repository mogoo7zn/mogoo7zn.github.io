import type { ReactNode } from "react";

interface Props {
  src: string;
  alt?: string;
  caption?: string;
  width?: string;
}

export default function Figure({ src, alt, caption, width }: Props) {
  return (
    <figure className="my-8 not-prose flex flex-col items-center">
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          borderColor: "var(--color-border)",
          maxWidth: width || "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={src}
          alt={alt || caption || ""}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-sm text-center italic"
          style={{ color: "var(--color-text-muted)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
