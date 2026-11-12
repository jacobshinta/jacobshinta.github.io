import Link from "next/link";
import { ProjectCard, PrototypeCard } from "@/components/ProjectCard";
import { Showcase } from "@/components/Showcase";
import {
  games,
  mainGames,
  otherPrototypes,
  prototypeGames,
  webProjects,
} from "@/lib/projects";
import { site } from "@/lib/site";

function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div id={id} className="mb-8 flex flex-col gap-3">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {children && (
        <p className="max-w-2xl leading-relaxed text-muted">{children}</p>
      )}
    </div>
  );
}

const skills = [
  { group: "Engines", items: ["Unity", "Godot 4"] },
  { group: "Languages", items: ["C#", "GDScript", "TypeScript", "SQL"] },
  {
    group: "Web",
    items: ["Next.js", "React", "Tailwind", "PostgreSQL", "Discord bots"],
  },
  { group: "Workflow", items: ["Git", "Design docs", "Playtesting", "Builds & export"] },
];

export default function Home() {
  const [lead, ...others] = mainGames;
  const playable = games.find((g) => g.links.play);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="flex flex-col gap-6 py-20 sm:py-28">
        <p className="font-mono text-sm text-muted">
          {site.role} · {site.location}
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
          Hi, I&apos;m Jacob.
          <br />I make <span className="text-accent">games</span>.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Mostly in Unity and Godot. Right now I&apos;m finishing Birdie Club,
          an online golf game headed to Steam.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          {playable && (
            <Link
              href={playable.links.play!}
              className="rounded-md bg-accent px-5 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              Play {playable.title} in your browser
            </Link>
          )}
          <Link
            href="/#games"
            className="rounded-md border border-line px-5 py-3 font-medium transition-colors hover:border-faint"
          >
            See the games
          </Link>
        </div>
      </section>

      {/* Demo reel: shown once site.reel is set */}
      {site.reel && (
        <section className="mb-24">
          <div className="aspect-video overflow-hidden rounded-2xl border border-line">
            {site.reel.endsWith(".mp4") ? (
              <video
                src={site.reel}
                controls
                playsInline
                className="h-full w-full"
              />
            ) : (
              <iframe
                src={site.reel}
                title="Demo reel"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            )}
          </div>
        </section>
      )}

      {/* Games */}
      <section className="pb-24">
        <SectionHeading id="games" eyebrow="Games" title="Things I've built to play">
          These are the ones I&apos;ve taken furthest. I built each of them
          solo, and each page goes into how the main systems work.
        </SectionHeading>

        {lead && (
          <>
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-faint">
              Now building
            </p>
            <Showcase project={lead} />
          </>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((g) => (
            <ProjectCard key={g.slug} project={g} />
          ))}
        </div>

        {prototypeGames.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Prototypes
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Smaller builds where I was testing one idea, usually a mechanic
              or some netcode I wanted to try.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {prototypeGames.map((g) => (
                <PrototypeCard key={g.slug} project={g} />
              ))}
            </div>
            {otherPrototypes && (
              <p className="mt-5 max-w-3xl text-sm text-faint">
                {otherPrototypes}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Web */}
      <section className="pb-24">
        <SectionHeading id="web" eyebrow="Web" title="Web projects">
          Full-stack sites I&apos;ve built for friends and for my own side
          projects.
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {webProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="grid gap-12 pb-24 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHeading id="about" eyebrow="About" title="A bit about me" />
          <div className="flex max-w-prose flex-col gap-4 leading-relaxed text-muted">
            <p>
              I learned to program at The Tech Academy&apos;s software
              development bootcamp in 2021, then interned on a small Agile team
              building an ASP.NET MVC site in C#.
            </p>
            <p>
              Since then most of my time has gone into games. I prototype a lot
              to find out quickly whether an idea is fun. When one is, I keep
              going until it has proper saves, progression, tests and whatever
              tools it needs. Right now that&apos;s{" "}
              <span className="text-text">Birdie Club</span>, which I&apos;m
              getting ready for Steam.
            </p>
            <p>
              The part I enjoy most is designing a system and watching it come
              to life. I like working out how something should behave, building
              it, and then tuning it until it feels right when someone actually
              plays it.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:pt-16">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-faint">
                {s.group}
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-md border border-line px-2.5 py-1 text-sm"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="pb-24">
        <div
          id="contact"
          className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-surface p-8 sm:p-12"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            Contact
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Hiring a gameplay programmer? Let&apos;s talk.
          </h2>
          <p className="text-muted">
            I work in Unity and Godot, and I&apos;m open to full-time roles,
            remote or relocating.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-md bg-accent px-5 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              {site.email}
            </a>
            {[
              ["Code samples", site.code],
              ["GitHub", site.github],
              ["itch.io", site.itch],
              ["LinkedIn", site.linkedin],
              ["Résumé", site.resume],
            ]
              .filter(([, url]) => url)
              .map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-line px-5 py-3 font-medium transition-colors hover:border-faint"
                >
                  {label} ↗
                </a>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
