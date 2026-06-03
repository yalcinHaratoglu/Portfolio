"use client"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "@/locales/en.json"
import tr from "@/locales/tr.json"
import type { Locale } from "@/lib/locale"

export const i18nResources = {
  en: { translation: en },
  tr: { translation: tr },
}

export function ensureI18n(initialLocale: Locale) {
  if (i18n.isInitialized) {
    if (!i18n.language?.startsWith(initialLocale)) {
      void i18n.changeLanguage(initialLocale)
    }
    return i18n
  }

  void i18n.use(initReactI18next).init({
    lng: initialLocale,
    resources: i18nResources,
    fallbackLng: "en",
    supportedLngs: ["en", "tr"],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

  return i18n
}

export default i18n
