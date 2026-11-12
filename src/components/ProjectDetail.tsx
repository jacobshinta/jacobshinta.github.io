import Link from "next/link";
import type { Project } from "@/lib/types";
import { Cover } from "./Cover";
import { MediaTile } from "./MediaTile";
import { MetaLine, Signature } from "./Meta";

const linkLabels: Record<string, string> = {
  play: "Play in browser",
  steam: "Wishlist on Steam",
  itch: "Get it on itch.io",
  download: "Download build",
  code: "Read a code sample",
  live: "Visit the site",
  github: "Source on GitHub",
};

export function ProjectDetail({ project }: { project: Project }) {
  const back =
    project.kind === "game"
      ? { href: "/#games", label: "All games" }
      : { href: "/#web", label: "All web projects" };

  const links = Object.entries(project.links).filter(([, url]) => url);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href={back.href}
        className="text-sm text-muted transition-colors hover:text-text"
      >
        ← {back.label}
      </Link>

      <header className="mt-6 flex flex-col gap-4">
        <MetaLine project={project} />
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          {project.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {project.pitch}
        </p>
        <Signature text={project.signature} className="max-w-2xl" />
        {links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {links.map(([key, url], i) => {
              const internal = url!.startsWith("/");
              const cls =
                i === 0
                  ? "rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
                  : "rounded-md border border-line px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-faint";
              return internal ? (
                <Link key={key} href={url!} className={cls}>
                  {linkLabels[key] ?? key}
                </Link>
              ) : (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={cls}
                >
                  {linkLabels[key] ?? key} ↗
                </a>
              );
            })}
          </div>
        )}
      </header>

      <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
        <Cover project={project} priority />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="flex flex-col gap-12">
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Overview
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-muted">
              {project.summary}
            </p>
            {project.note && (
              <p className="mt-4 max-w-prose border-l-2 border-line pl-4 text-sm text-faint">
                {project.note}
              </p>
            )}
          </section>

          {project.highlights.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                What I built
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li
                    key={h.title}
                    className="rounded-xl border border-line bg-surface p-5"
                  >
                    <h3 className="font-medium">{h.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {h.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.media && project.media.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                {project.media.some((m) => m.type === "video" && m.src)
                  ? "In motion"
                  : "Gallery"}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.media.map((m) => (
                  <div key={m.label} className="aspect-[16/9]">
                    <MediaTile item={m} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Screenshots
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="w-full rounded-xl border border-line"
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-line bg-surface p-5 lg:sticky lg:top-24">
          <h2 className="font-mono text-xs uppercase tracking-wider text-faint">
            Built with
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-md bg-surface-2 px-2.5 py-1 text-sm text-text/90"
              >
                {t}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
