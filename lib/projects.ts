export type ProjectSlug =
  | "ratio-ems"
  | "ratio-sim"
  | "ratio-energy"
  | "eyeds"
  | "ems-scada-editor"
  | "ems-facility-editor"
  | "ems-dashboard"
  | "ems-mobile"
  | "sim-results"
  | "ems-trading"

export interface ProjectMeta {
  slug: ProjectSlug
  image: string
  liveUrl?: string
  year: string
}

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "ratio-ems",
    image: "/projects/ratio-ems.jpg",
    liveUrl: "https://app.ratioems.com/login",
    year: "2024",
  },
  {
    slug: "ratio-sim",
    image: "/projects/ratio-sim.jpg",
    liveUrl: "https://ratiosim.com/",
    year: "2024",
  },
  {
    slug: "ratio-energy",
    image: "/projects/ratio-energy.jpg",
    liveUrl: "https://ratio.energy/",
    year: "2024",
  },
  {
    slug: "eyeds",
    image: "/projects/eyeds.jpg",
    liveUrl: "https://eyeds.com.tr/",
    year: "2024",
  },
  {
    slug: "ems-scada-editor",
    image: "/projects/ems-scada-editor.jpg",
    year: "2024",
  },
  {
    slug: "ems-facility-editor",
    image: "/projects/ems-facility-editor.jpg",
    year: "2024",
  },
  {
    slug: "ems-dashboard",
    image: "/projects/ems-dashboard.jpg",
    year: "2024",
  },
  {
    slug: "ems-mobile",
    image: "/projects/ems-mobile.jpg",
    year: "2024",
  },
  {
    slug: "sim-results",
    image: "/projects/sim-results.jpg",
    year: "2024",
  },
  {
    slug: "ems-trading",
    image: "/projects/ems-trading.jpg",
    year: "2024",
  },
]

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function isValidProjectSlug(slug: string): slug is ProjectSlug {
  return PROJECTS.some((p) => p.slug === slug)
}
