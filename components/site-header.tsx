"use client"

import type React from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MobileNavDock } from "@/components/mobile-nav-dock"
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
    <>
      {/* Desktop */}
      <nav className="theme-surface fixed top-0 left-0 right-0 z-40 hidden border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-950/75 md:block">
        <div className="mx-auto max-w-7xl px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-wider">
              <span className="text-black dark:text-white">Y</span>
              <span className="text-gray-500">H</span>
            </Link>

            <div className="flex items-center space-x-12">
              {navItems.map((key, index) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => scrollToSection(key)}
                  className="group relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-black dark:hover:text-white"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{t(`nav.${key}`)}</span>
                  <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full dark:bg-white" />
                </button>
              ))}
            </div>

            <div className="relative z-50 flex shrink-0 items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <Button
                type="button"
                onClick={openHireMe}
                className="bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {t("nav.hireMe")}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile — üst logo */}
      <header className="theme-surface pointer-events-none fixed top-0 left-0 right-0 z-40 md:hidden">
        <div className="pointer-events-auto flex justify-center px-5 pb-2 pt-4">
          <Link
            href="/"
            className="rounded-full border border-gray-200/80 bg-white/90 px-4 py-2 text-xl font-bold tracking-wider shadow-sm backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/90"
          >
            <span className="text-black dark:text-white">Y</span>
            <span className="text-gray-500">H</span>
          </Link>
        </div>
      </header>

      <MobileNavDock variant={variant} sectionRefs={sectionRefs} />
    </>
  )
}
