"use client"

import type React from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "@/i18n/client"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

function DocumentI18nSync() {
  const { i18n: i18nInstance, t } = useTranslation()

  useEffect(() => {
    const lang = i18nInstance.language?.startsWith("tr") ? "tr" : "en"
    document.documentElement.lang = lang
    document.title = t("meta.title")
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute("content", t("meta.description"))
    }
  }, [i18nInstance.language, t])

  return null
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <DocumentI18nSync />
      {children}
    </I18nextProvider>
  )
}
