"use client"

import type React from "react"
import { createContext, useCallback, useContext, useState } from "react"
import { HireMeModal } from "@/components/hire-me-modal"

type HireMeContextValue = {
  open: boolean
  openHireMe: () => void
  closeHireMe: () => void
}

const HireMeContext = createContext<HireMeContextValue | null>(null)

export function HireMeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const openHireMe = useCallback(() => setOpen(true), [])
  const closeHireMe = useCallback(() => setOpen(false), [])

  return (
    <HireMeContext.Provider value={{ open, openHireMe, closeHireMe }}>
      {children}
      <HireMeModal open={open} onOpenChange={setOpen} />
    </HireMeContext.Provider>
  )
}

export function useHireMe() {
  const ctx = useContext(HireMeContext)
  if (!ctx) {
    throw new Error("useHireMe must be used within HireMeProvider")
  }
  return ctx
}
