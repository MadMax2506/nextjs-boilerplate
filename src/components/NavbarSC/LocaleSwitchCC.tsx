"use client"

import { Locale, usePathname, useRouter } from "@i18n"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslations } from "next-intl"

export const LocaleSwitchCC = () => {
  const t = useTranslations("navbar.locale")

  const router = useRouter()
  const pathname = usePathname()

  const onClick = (locale: Locale) => router.push(pathname, { locale })

  const locales: { prefix: string; locale: Locale }[] = [
    { prefix: "🇺🇸", locale: "en" },
    { prefix: "🇩🇪", locale: "de" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Globe size={20} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {locales.map(({ prefix, locale }) => (
          <DropdownMenuItem key={locale} onClick={() => onClick(locale)}>
            {prefix} {t(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
