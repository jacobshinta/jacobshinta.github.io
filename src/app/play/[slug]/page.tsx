import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/lib/projects";

// Games whose exported web build lives in public/builds/<slug>/index.html.
const playable = games.filter((g) => g.links.play);

export const dynamicParams = false;

export function generateStaticParams() {
  return playable.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/play/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const game = playable.find((g) => g.slug === slug);
  return game ? { title: `Play ${game.title}` } : {};
}

export default async function PlayPage({ params }: PageProps<"/play/[slug]">) {
  const { slug } = await params;
  const game = playable.find((g) => g.slug === slug);
  if (!game) notFound();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/games/${game.slug}/`}
          className="text-sm text-muted transition-colors hover:text-text"
        >
          ← About {game.title}
        </Link>
        <a
          href={`/builds/${game.slug}/`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted transition-colors hover:text-text"
        >
          Open full screen ↗
        </a>
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-line bg-black">
        <iframe
          src={`/builds/${game.slug}/`}
          title={game.title}
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <p className="text-sm text-faint">
        Click the game to give it focus. Best on desktop with headphones.
      </p>
    </div>
  );
}
