import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export type Locale = "de" | "en"

export const LOCALES: Locale[] = ["en", "de"]
export const DEFAULT_LOCALE: Locale = "de"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
