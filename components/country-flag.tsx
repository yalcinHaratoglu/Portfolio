"use client"

import type { ComponentType } from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export type CountryCode = "GB" | "TR"

type FlagComponent = ComponentType<{ className?: string }>

async function loadFlag(code: CountryCode): Promise<FlagComponent> {
  const mod =
    code === "GB"
      ? await import("country-flag-icons/react/3x2/GB")
      : await import("country-flag-icons/react/3x2/TR")
  return mod.default as FlagComponent
}

export function CountryFlag({
  code,
  className,
}: {
  code: CountryCode
  className?: string
}) {
  const [Flag, setFlag] = useState<FlagComponent | null>(null)

  useEffect(() => {
    let cancelled = false
    void loadFlag(code).then((component) => {
      if (!cancelled) setFlag(() => component)
    })
    return () => {
      cancelled = true
    }
  }, [code])

  if (!Flag) {
    return (
      <span
        className={cn("inline-block shrink-0 rounded-sm bg-gray-200 dark:bg-gray-800", className)}
        aria-hidden
      />
    )
  }

  return <Flag className={className} />
}
