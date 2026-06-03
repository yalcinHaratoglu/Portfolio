"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import type { ProjectSlug } from "@/lib/projects"

export interface ProjectShowcaseItemProps {
  slug: ProjectSlug
  title: string
  subtitle: string
  description: string
  tech: string[]
  image: string
  year: string
  index: number
}

export function ProjectShowcaseItem({
  slug,
  title,
  subtitle,
  description,
  tech,
  image,
  year,
  index,
}: ProjectShowcaseItemProps) {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const [imgSrc, setImgSrc] = useState(image)
  const reversed = index % 2 === 1

  useEffect(() => {
    setImgSrc(image)
  }, [image])

  return (
    <article
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
        reversed ? "lg:grid-flow-col-dense" : ""
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className={reversed ? "lg:col-start-2" : ""}>
        <div className="mb-6">
          <span className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-3 block">{year}</span>
          <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight text-black dark:text-white">{title}</h3>
          <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 max-w-xl">{description}</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {tech.map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-300 dark:border-gray-700"
            >
              {item}
            </span>
          ))}
        </div>

        <Button
          asChild
          className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 group"
        >
          <Link href={`/projects/${slug}`}>
            {t("projectCard.viewDetails")}
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>

      <div className={`relative group ${reversed ? "lg:col-start-1 lg:row-start-1" : ""}`}>
        <Link href={`/projects/${slug}`} className="block">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="relative h-72 sm:h-80 lg:h-96 bg-gray-100 dark:bg-gray-800">
              <Image
                src={imgSrc}
                alt={title}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                onError={() =>
                  setImgSrc(`/placeholder.svg?height=600&width=800&text=${encodeURIComponent(title)}`)
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="absolute -z-10 -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-gray-100 dark:from-white/10 to-transparent rounded-full blur-xl pointer-events-none" />
        <div className="absolute -z-10 -bottom-8 -left-8 w-24 h-24 border border-gray-300 dark:border-white/20 rounded-lg rotate-45 pointer-events-none" />
      </div>
    </article>
  )
}
