import type { Project } from "@/lib/types";

export function StatusDot({ tone = "building" }: { tone?: Project["statusTone"] }) {
  const cls =
    tone === "live"
      ? "bg-accent shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_25%,transparent)]"
      : tone === "building"
        ? "border-2 border-accent"
        : "bg-faint";
  return <span aria-hidden className={`inline-block size-2 shrink-0 rounded-full ${cls}`} />;
}

/** One quiet line: ● status · platform · genre. */
export function MetaLine({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted ${className}`}>
      <StatusDot tone={project.statusTone} />
      <span className="text-text/90">{project.status}</span>
      <span className="text-faint">·</span>
      <span>{project.platform}</span>
      <span className="text-faint">·</span>
      <span>{project.genre}</span>
    </p>
  );
}

/** The single standout technical fact, set off with an accent bar. */
export function Signature({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <p
      className={`border-l-2 border-accent pl-3 font-mono text-[12.5px] leading-snug text-text/85 ${className}`}
    >
      {text}
    </p>
  );
}
