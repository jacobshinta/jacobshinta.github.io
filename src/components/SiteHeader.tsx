import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/#games", label: "Games" },
  { href: "/#web", label: "Web" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-text sm:block"
            >
              {item.label}
            </Link>
          ))}
          {site.resume && (
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-text"
            >
              Résumé
            </a>
          )}
          <a
            href={`mailto:${site.email}`}
            className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
