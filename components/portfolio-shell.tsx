"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"

type PortfolioShellProps = {
  children: React.ReactNode
  showLoading?: boolean
}

export function PortfolioShell({ children, showLoading = false }: PortfolioShellProps) {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    const update = () => setFinePointer(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!finePointer) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [finePointer])

  return (
    <div className="theme-surface min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white overflow-x-hidden relative">
      {showLoading && <LoadingScreen />}

      {finePointer && (
        <div
          className="fixed w-6 h-6 rounded-full pointer-events-none z-[100] transition-transform duration-150 mix-blend-difference"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${scrollY > 100 ? 0.5 : 1})`,
            backgroundColor: "white",
          }}
        />
      )}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="theme-surface absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950" />
        {finePointer && (
          <div
            className="absolute inset-0 opacity-20 dark:opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(128,128,128,0.15) 0%, transparent 50%)`,
            }}
          />
        )}
        <div className="absolute top-20 left-20 w-32 h-32 border border-gray-200 dark:border-white/10 rotate-45 animate-pulse" />
        <div className="absolute top-60 right-40 w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full animate-bounce" />
        <div
          className="absolute bottom-40 left-60 w-16 h-16 border border-gray-300 dark:border-white/20 animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>

      <div className="relative z-10 pb-[calc(4.25rem+env(safe-area-inset-bottom))] pt-14 md:pb-0 md:pt-0">
        {children}
      </div>
    </div>
  )
}
