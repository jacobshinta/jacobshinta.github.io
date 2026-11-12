import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";
import { webProjects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return webProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/web/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = webProjects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.pitch } : {};
}

export default async function WebProjectPage({
  params,
}: PageProps<"/web/[slug]">) {
  const { slug } = await params;
  const project = webProjects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
