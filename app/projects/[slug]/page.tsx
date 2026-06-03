import { notFound } from "next/navigation"
import { ProjectDetail } from "@/components/project-detail"
import { getProjectBySlug, isValidProjectSlug } from "@/lib/projects"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { PROJECTS } = await import("@/lib/projects")
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params

  if (!isValidProjectSlug(slug)) {
    notFound()
  }

  const project = getProjectBySlug(slug)
  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
