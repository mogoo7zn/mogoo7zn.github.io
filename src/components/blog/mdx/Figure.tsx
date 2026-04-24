interface Props {
  src: string;
  alt?: string;
  caption?: string;
  width?: string;
  className?: string;
  frameClassName?: string;
  imgClassName?: string;
  fit?: "contain" | "cover";
  height?: string;
  background?: string;
  padding?: string;
}

export default function Figure({
  src,
  alt,
  caption,
  width,
  className = "",
  frameClassName = "",
  imgClassName = "",
  fit = "contain",
  height,
  background,
  padding,
}: Props) {
  return (
    <figure className={`my-8 not-prose flex flex-col items-center ${className}`}>
      <div
        className={`overflow-hidden rounded-[1.4rem] border ${frameClassName}`}
        style={{
          borderColor: "var(--color-border)",
          maxWidth: width || "100%",
          boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
          background:
            background ||
            "linear-gradient(180deg, color-mix(in srgb, var(--color-bg-card) 96%, transparent), color-mix(in srgb, var(--color-bg-secondary) 92%, transparent))",
          padding,
        }}
      >
        <img
          src={src}
          alt={alt || caption || ""}
          className={`block w-full ${imgClassName}`}
          loading="lazy"
          style={{
            height: height || "auto",
            objectFit: height ? fit : undefined,
            objectPosition: "center",
          }}
        />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-[0.95rem] text-center italic leading-7"
          style={{ color: "var(--color-text-muted)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
