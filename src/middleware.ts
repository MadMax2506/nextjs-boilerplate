import { DEFAULT_LOCALE, LOCALES, routing } from "@i18n"
import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)

  const {
    nextUrl: { pathname },
  } = request

  // Get the detected locale
  const locales = LOCALES
  const defaultLocale = DEFAULT_LOCALE
  const locale = locales.find((locale) => pathname.startsWith(`/${locale}`)) || defaultLocale

  // Set the locale in a cookie
  response.cookies.set("NEXT_LOCALE", locale)

  return response
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|en)/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}
