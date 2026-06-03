"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { ProjectMeta } from "@/lib/projects"

type ProjectDetailProps = {
  project: ProjectMeta
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { t } = useTranslation()
  const slug = project.slug
  const [imgSrc, setImgSrc] = useState(project.image)

  const title = t(`projects.details.${slug}.title`)
  const subtitle = t(`projects.details.${slug}.subtitle`)
  const overview = t(`projects.details.${slug}.overview`)
  const role = t(`projects.details.${slug}.role`)
  const outcome = t(`projects.details.${slug}.outcome`)
  const highlights = t(`projects.details.${slug}.highlights`, { returnObjects: true }) as string[]
  const cardItem = t("projects.items", { returnObjects: true }) as Array<{ slug: string; tech: string[] }>
  const tech = cardItem.find((i) => i.slug === slug)?.tech ?? []

  return (
    <>
      <SiteHeader variant="minimal" />

      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("projects.backToProjects")}
          </Link>

          <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 mb-10 shadow-lg">
            <div className="relative h-64 md:h-80 bg-gray-100 dark:bg-gray-800">
              <Image
                src={imgSrc}
                alt={title}
                fill
                unoptimized
                className="object-cover"
                priority
                onError={() =>
                  setImgSrc(`/placeholder.svg?height=600&width=800&text=${encodeURIComponent(title)}`)
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-sm tracking-widest text-gray-300 mb-2 block">{project.year}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
                <p className="text-lg text-gray-200">{subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {tech.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 bg-white/60 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-800 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="space-y-10 text-lg leading-relaxed">
            <section>
              <h2 className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-3 uppercase">
                {t("projects.sections.overview")}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{overview}</p>
            </section>

            <section>
              <h2 className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-3 uppercase">
                {t("projects.sections.role")}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{role}</p>
            </section>

            <section>
              <h2 className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-4 uppercase">
                {t("projects.sections.highlights")}
              </h2>
              <ul className="space-y-3">
                {highlights.map((item, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-black dark:text-white mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-3 uppercase">
                {t("projects.sections.outcome")}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{outcome}</p>
            </section>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            {project.liveUrl && (
              <Button
                asChild
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  {t("projects.visitLive")}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black bg-transparent"
            >
              <Link href="/#projects">{t("projects.backToProjects")}</Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
