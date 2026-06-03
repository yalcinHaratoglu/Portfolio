"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import GB from "country-flag-icons/react/3x2/GB"
import TR from "country-flag-icons/react/3x2/TR"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const LANGUAGES = [
  { code: "en" as const, Flag: GB, labelKey: "language.en" },
  { code: "tr" as const, Flag: TR, labelKey: "language.tr" },
]

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const currentLang = i18n.language?.startsWith("tr") ? "tr" : "en"
  const current = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0]
  const CurrentFlag = current.Flag

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
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
      <div
        className="h-10 min-w-[5.25rem] shrink-0 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
        aria-hidden
      />
    )
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label={t("language.select")}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "inline-flex h-10 min-w-[5.25rem] items-center gap-2 rounded-md border px-3 text-sm font-medium transition-all duration-200",
          "border-gray-200 bg-white text-black hover:bg-gray-50",
          "dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800",
          open && "ring-2 ring-gray-300 ring-offset-0 dark:ring-gray-600",
        )}
      >
        <CurrentFlag className="h-3.5 w-5 shrink-0 rounded-sm" />
        <span className="uppercase leading-none">{current.code}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 shrink-0 opacity-50 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("language.select")}
          className={cn(
            "absolute right-0 top-[calc(100%+6px)] z-[60] min-w-[10.5rem] overflow-hidden rounded-md border py-1 shadow-lg",
            "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950",
          )}
        >
          {LANGUAGES.map(({ code, Flag, labelKey }) => {
            const isActive = currentLang === code
            return (
              <li key={code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    i18n.changeLanguage(code)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium transition-colors",
                    "text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800",
                    isActive && "bg-gray-100 dark:bg-gray-800",
                  )}
                >
                  <Flag className="h-3.5 w-5 shrink-0 rounded-sm" />
                  <span className="flex-1 leading-none">{t(labelKey)}</span>
                  {isActive && <Check className="h-3.5 w-3.5 shrink-0 opacity-70" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
