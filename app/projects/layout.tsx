import type { ReactNode } from "react"
import { PortfolioShell } from "@/components/portfolio-shell"

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <PortfolioShell>{children}</PortfolioShell>
}
