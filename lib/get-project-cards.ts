import { PROJECTS } from "@/lib/projects"
import type { TFunction } from "i18next"

export function getProjectCards(t: TFunction) {
  const items = t("projects.items", { returnObjects: true }) as Array<{
    slug: string
    title: string
    subtitle: string
    description: string
    tech: string[]
  }>

  return PROJECTS.map((meta) => {
    const item = items.find((i) => i.slug === meta.slug)
    return {
      ...meta,
      title: item?.title ?? meta.slug,
      subtitle: item?.subtitle ?? "",
      description: item?.description ?? "",
      tech: item?.tech ?? [],
    }
  })
}
