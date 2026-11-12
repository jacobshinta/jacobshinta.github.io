import type { Media } from "@/lib/types";

/**
 * One gallery item: an image, a looping muted clip, or (when src is empty)
 * a dashed "coming soon" slot that holds the layout until footage exists.
 */
export function MediaTile({
  item,
  className = "",
  eager = false,
}: {
  item: Media;
  className?: string;
  eager?: boolean;
}) {
  if (!item.src) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface p-4 text-center ${className}`}
      >
        <svg viewBox="0 0 24 24" className="size-6 text-faint" aria-hidden>
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
        <span className="text-sm text-muted">{item.label}</span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
          Coming soon
        </span>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <video
        src={item.src}
        aria-label={item.label}
        autoPlay
        muted
        loop
        playsInline
        className={`h-full w-full rounded-xl border border-line object-cover ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.label}
      loading={eager ? "eager" : "lazy"}
      className={`h-full w-full rounded-xl border border-line object-cover ${className}`}
    />
  );
}
