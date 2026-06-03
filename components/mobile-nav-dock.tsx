"use client"

import type React from "react"
import { useTranslation } from "react-i18next"
import { Briefcase, LayoutGrid, Mail, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useHireMe } from "@/components/hire-me-provider"

type NavKey = "about" | "skills" | "projects" | "contact"

const NAV_ITEMS: { key: NavKey; icon: typeof User; labelKey: string }[] = [
  { key: "about", icon: User, labelKey: "nav.short.about" },
  { key: "skills", icon: Sparkles, labelKey: "nav.short.skills" },
  { key: "projects", icon: LayoutGrid, labelKey: "nav.short.projects" },
  { key: "contact", icon: Mail, labelKey: "nav.short.contact" },
]

const DOCK_HEIGHT = "h-14"
const DOCK_ITEM_HEIGHT = "h-12"

type MobileNavDockProps = {
  variant?: "home" | "minimal"
  sectionRefs?: Partial<Record<NavKey, React.RefObject<HTMLElement | null>>>
}

function DockItem({
  label,
  ariaLabel,
  onClick,
  children,
  active,
}: {
  label: string
  ariaLabel: string
  onClick: () => void
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-0.5 transition-colors",
        DOCK_ITEM_HEIGHT,
        active
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800/80",
      )}
    >
      {children}
      <span className="w-full truncate text-center text-[8px] font-medium leading-none">{label}</span>
    </button>
  )
}

export function MobileNavDock({ variant = "home", sectionRefs }: MobileNavDockProps) {
  const { t } = useTranslation()
  const { openHireMe } = useHireMe()

  const scrollToSection = (key: NavKey) => {
    if (variant === "home" && sectionRefs?.[key]?.current) {
      sectionRefs[key]!.current?.scrollIntoView({ behavior: "smooth" })
      return
    }
    window.location.href = `/#${key}`
  }

  return (
    <nav
      className="theme-surface pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden"
      aria-label={t("nav.mobileDock")}
    >
      <div
        className="pointer-events-auto mx-2 mb-2 rounded-2xl border border-gray-200/80 bg-white/95 px-1 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/95 dark:shadow-[0_-4px_20px_rgba(0,0,0,0.35)]"
        style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}
      >
        <div className={cn("flex items-center gap-1 p-1", DOCK_HEIGHT)}>
          {/* Nav + Çalış */}
          <div className="flex min-w-0 flex-1 items-center gap-1">
            {NAV_ITEMS.map(({ key, icon: Icon, labelKey }) => (
              <DockItem
                key={key}
                label={t(labelKey)}
                ariaLabel={t(`nav.${key}`)}
                onClick={() => scrollToSection(key)}
              >
                <Icon className="h-4 w-4 shrink-0" />
              </DockItem>
            ))}
            <DockItem label={t("nav.hireShort")} ariaLabel={t("nav.hireMe")} onClick={openHireMe} active>
              <Briefcase className="h-4 w-4 shrink-0" />
            </DockItem>
          </div>

          <div
            className={cn("mx-1 w-px shrink-0 bg-gray-200 dark:bg-gray-700", DOCK_ITEM_HEIGHT)}
            role="separator"
            aria-orientation="vertical"
          />

          {/* Tema + dil */}
          <div className="flex shrink-0 items-center justify-center gap-2 px-2">
            <ThemeToggle />
            <LanguageSwitcher compact dropdownPlacement="top" />
          </div>
        </div>
      </div>
    </nav>
  )
}
