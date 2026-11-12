import type { Project } from "@/lib/types";

/**
 * A project's cover image, or a typographic stand-in when there isn't one yet,
 * so a missing screenshot never leaves a broken box.
 */
export function Cover({
  project,
  className = "",
  priority = false,
  compact = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  /** Smaller title for thumbnail-sized stand-ins. */
  compact?: boolean;
}) {
  if (project.cover) {
    return (
      // Static export, so no next/image.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.cover}
        alt={`${project.title} screenshot`}
        loading={priority ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`relative flex h-full w-full items-end overflow-hidden bg-surface-2 ${compact ? "p-3" : "p-5"} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--text) 0 1px, transparent 1px 14px)",
        }}
      />
      <span
        className={`relative font-display font-semibold leading-none tracking-tight text-text/80 ${compact ? "text-lg" : "text-3xl"}`}
      >
        {project.title}
      </span>
    </div>
  );
}
