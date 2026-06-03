"use client"

import { useTranslation } from "react-i18next"

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-bold tracking-wider mb-4 md:mb-0">
            <span className="text-black dark:text-white">Y</span>
            <span className="text-gray-500">H</span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{t("footer.available")}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Yalçın Haratoğlu. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
