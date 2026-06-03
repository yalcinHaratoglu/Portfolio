"use client"

import type React from "react"
import { I18nextProvider } from "react-i18next"
import i18n, { ensureI18n } from "@/i18n/client"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import type { Locale } from "@/lib/locale"
import { persistClientLocale } from "@/lib/locale"

function DocumentI18nSync() {
  const { i18n: i18nInstance, t } = useTranslation()

  useEffect(() => {
    const lang: Locale = i18nInstance.language?.startsWith("tr") ? "tr" : "en"
    persistClientLocale(lang)
    document.documentElement.lang = lang
    document.title = t("meta.title")
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute("content", t("meta.description"))
    }
  }, [i18nInstance.language, t])

  return null
}

type I18nProviderProps = {
  children: React.ReactNode
  initialLocale: Locale
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  ensureI18n(initialLocale)

  useEffect(() => {
    persistClientLocale(initialLocale)
  }, [initialLocale])

  return (
    <I18nextProvider i18n={i18n}>
      <DocumentI18nSync />
      {children}
    </I18nextProvider>
  )
}
