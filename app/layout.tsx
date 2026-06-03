import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/components/i18n-provider"
import { HireMeProvider } from "@/components/hire-me-provider"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yalçın Haratoğlu — Frontend Developer | Energy & Enterprise SaaS",
  description:
    "Frontend Developer building Ratio EMS and RatioSIM B2B SaaS with React, TypeScript, Vite, WebSocket, and SCADA interfaces for the energy sector.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            <HireMeProvider>
              {children}
              <Toaster richColors position="top-center" />
            </HireMeProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
