"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteData } from "@/lib/site-data"
import { CountryFlag, type CountryCode } from "@/components/country-flag"

const CV_OPTIONS: {
  lang: "en" | "tr"
  flag: CountryCode
  path: string
  labelKey: string
  fileName: string
}[] = [
  {
    lang: "en",
    flag: "GB",
    path: siteData.cv.en,
    labelKey: "hero.cvEnglish",
    fileName: "Yalcin-Haratoglu-CV-EN.pdf",
  },
  {
    lang: "tr",
    flag: "TR",
    path: siteData.cv.tr,
    labelKey: "hero.cvTurkish",
    fileName: "Yalcin-Haratoglu-CV-TR.pdf",
  },
]

export function CvDownloadButton({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        className={cn(
          "border-black dark:border-white text-black dark:text-white px-8 py-4 text-lg font-medium bg-transparent",
          className,
        )}
        aria-hidden
      >
        <Download className="mr-2 h-5 w-5" />
        {t("hero.downloadCv")}
      </Button>
    )
  }

  return (
    <div ref={rootRef} className={cn("relative z-30", className)}>
      <Button
        type="button"
        variant="outline"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("hero.chooseCvLanguage")}
        onClick={() => setOpen((prev) => !prev)}
        className="border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black px-8 py-4 text-lg font-medium bg-transparent group w-full sm:w-auto"
      >
        <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
        {t("hero.downloadCv")}
        <ChevronDown
          className={cn("ml-2 h-4 w-4 opacity-60 transition-transform duration-200", open && "rotate-180")}
        />
      </Button>

      {open && (
        <ul
          role="menu"
          aria-label={t("hero.chooseCvLanguage")}
          className={cn(
            "absolute left-0 z-[60] min-w-[10.5rem] top-[calc(100%+8px)] overflow-hidden rounded-md border py-1 shadow-xl",
            "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950",
          )}
        >
          {CV_OPTIONS.map(({ lang, flag, path, labelKey, fileName }) => (
            <li key={lang} role="none">
              <a
                role="menuitem"
                href={path}
                download={fileName}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-semibold transition-colors",
                  "text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800",
                )}
              >
                <CountryFlag code={flag} className="h-3.5 w-5 shrink-0 rounded-sm" />
                <span>{t(labelKey)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
