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
import { resolveServerLocale } from "@/lib/locale"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yalçın Haratoğlu — Frontend Developer | Civil Engineering & Energy Software",
  description:
    "Frontend Developer building civil engineering and energy software with React, TypeScript, Vite, WebSocket, and SCADA interfaces for the energy sector.",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "YH Portfolio",
  },
  other: {
    "msapplication-TileColor": "#030712",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialLocale = await resolveServerLocale()

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        <I18nProvider initialLocale={initialLocale}>
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
