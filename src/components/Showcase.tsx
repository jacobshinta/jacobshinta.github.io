import Link from "next/link";
import type { Project } from "@/lib/types";
import { Cover } from "./Cover";
import { MediaTile } from "./MediaTile";
import { MetaLine, Signature } from "./Meta";
import { projectHref } from "./ProjectCard";

/**
 * The big "Now building" block for the lead project: a large cover, a strip
 * of media (clips, stills, or coming-soon slots), and the top highlights.
 */
export function Showcase({ project }: { project: Project }) {
  const media = project.media ?? [];
  const top = project.highlights.slice(0, 3);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="grid gap-px bg-line lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-3 bg-surface p-3">
          <Link
            href={projectHref(project)}
            className="group block aspect-[16/9] overflow-hidden rounded-xl lg:aspect-auto lg:min-h-0 lg:flex-1"
          >
            <Cover
              project={project}
              priority
              className="transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </Link>
          {media.length > 0 && (
            <div className={`grid grid-cols-2 gap-3 ${media.length > 2 ? "sm:grid-cols-4" : ""}`}>
              {media.map((m) => (
                <div key={m.label} className="aspect-[16/9]">
                  <MediaTile item={m} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 bg-surface p-6 sm:p-8">
          <MetaLine project={project} />
          <h3 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h3>
          <p className="leading-relaxed text-muted">{project.pitch}</p>
          <Signature text={project.signature} />
          <ul className="flex flex-col gap-3 border-t border-line pt-5">
            {top.map((h) => (
              <li key={h.title} className="text-sm leading-relaxed">
                <span className="font-medium text-text">{h.title}. </span>
                <span className="text-muted">{h.body}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            <Link
              href={projectHref(project)}
              className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              How I built it
            </Link>
            {project.links.steam && (
              <a
                href={project.links.steam}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-faint"
              >
                Wishlist on Steam ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
