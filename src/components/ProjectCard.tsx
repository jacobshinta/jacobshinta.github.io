import Link from "next/link";
import type { Project } from "@/lib/types";
import { Cover } from "./Cover";
import { MetaLine, Signature } from "./Meta";

export function projectHref(p: Project) {
  return `/${p.kind === "game" ? "games" : "web"}/${p.slug}/`;
}

/** The standard card: image, one meta line, title, pitch, signature fact. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={projectHref(project)}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-faint"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <Cover
          project={project}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <MetaLine project={project} />
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{project.pitch}</p>
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <Signature text={project.signature} />
          {project.links.play && (
            <p className="text-sm font-medium text-accent">
              Playable in your browser →
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

/** A smaller, horizontal card for prototypes. */
export function PrototypeCard({ project }: { project: Project }) {
  return (
    <Link
      href={projectHref(project)}
      className="group grid grid-cols-[7.5rem_1fr] gap-4 overflow-hidden rounded-xl border border-line bg-surface p-3 transition-colors hover:border-faint sm:grid-cols-[10rem_1fr]"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
        <Cover project={project} compact />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-2 py-1 pr-2">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs text-muted">
          {project.platform} · {project.genre}
        </p>
        <Signature text={project.signature} className="hidden sm:block" />
      </div>
    </Link>
  );
}
