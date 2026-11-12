import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";
import { games } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/games/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  return game ? { title: game.title, description: game.pitch } : {};
}

export default async function GamePage({ params }: PageProps<"/games/[slug]">) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();
  return <ProjectDetail project={game} />;
}
