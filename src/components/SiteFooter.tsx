import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js, hosted
          on GitHub Pages.
        </p>
        {/* Plain <a>: /2021 is a separate static page, not a Next.js route. */}
        <a
          href="/2021/"
          className="underline decoration-line underline-offset-4 transition-colors hover:text-muted"
        >
          See the first portfolio site I ever built (2021) →
        </a>
      </div>
    </footer>
  );
}
