export type Locale = "en" | "tr"

export const LANGUAGE_COOKIE = "portfolio-language"

export function parseLocale(value: string | undefined | null): Locale | null {
  if (!value) return null
  if (value.startsWith("tr")) return "tr"
  if (value.startsWith("en")) return "en"
  return null
}

export async function resolveServerLocale(): Promise<Locale> {
  const { cookies, headers } = await import("next/headers")
  const cookieStore = await cookies()
  const fromCookie = parseLocale(cookieStore.get(LANGUAGE_COOKIE)?.value)
  if (fromCookie) return fromCookie

  const accept = (await headers()).get("accept-language") ?? ""
  if (/\btr\b/i.test(accept) || accept.toLowerCase().includes("tr-")) return "tr"
  return "en"
}

export function persistClientLocale(locale: Locale) {
  if (typeof window === "undefined") return
  localStorage.setItem(LANGUAGE_COOKIE, locale)
  document.cookie = `${LANGUAGE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`
}
