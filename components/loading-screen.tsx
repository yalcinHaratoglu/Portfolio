"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export function LoadingScreen() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + 3
      })
    }, 60)

    return () => clearInterval(progressInterval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-950 flex flex-col items-center justify-center">
      <div className="mb-8">
        <div
          className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-wider"
          style={{
            opacity: Math.min(1, progress / 30),
            transform: `translateY(${Math.max(0, 20 - progress / 2)}px)`,
          }}
        >
          <span className="inline-block">Y</span>
          <span className="inline-block text-gray-400">H</span>
        </div>
      </div>

      <div className="w-64 mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-0.5 overflow-hidden">
          <div
            className="h-full bg-black dark:bg-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className="text-sm text-gray-500 dark:text-gray-400 tracking-widest"
        style={{
          opacity: Math.max(0, (progress - 20) / 80),
        }}
      >
        {progress < 100 ? t("loading.loading") : t("loading.ready")}
      </div>
    </div>
  )
}
