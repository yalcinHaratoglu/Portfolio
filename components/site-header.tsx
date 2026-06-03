"use client"

import type React from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useHireMe } from "@/components/hire-me-provider"

type NavKey = "about" | "skills" | "projects" | "contact"

type SiteHeaderProps = {
  variant?: "home" | "minimal"
  sectionRefs?: Partial<Record<NavKey, React.RefObject<HTMLElement | null>>>
}

export function SiteHeader({ variant = "home", sectionRefs }: SiteHeaderProps) {
  const { t } = useTranslation()
  const { openHireMe } = useHireMe()

  const navItems: NavKey[] = ["about", "skills", "projects", "contact"]

  const scrollToSection = (key: NavKey) => {
    if (variant === "home" && sectionRefs?.[key]?.current) {
      sectionRefs[key]!.current?.scrollIntoView({ behavior: "smooth" })
      return
    }
    window.location.href = `/#${key}`
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-950/75 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-wider">
            <span className="text-black dark:text-white">Y</span>
            <span className="text-gray-500">H</span>
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((key, index) => (
              <button
                key={key}
                type="button"
                onClick={() => scrollToSection(key)}
                className="relative group text-sm font-medium tracking-wide hover:text-black dark:hover:text-white transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{t(`nav.${key}`)}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="relative z-50 flex shrink-0 items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button
              type="button"
              onClick={openHireMe}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 text-sm font-medium"
            >
              {t("nav.hireMe")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
