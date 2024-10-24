"use client"

import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export const ThemeSwitchCC = () => {
  const t = useTranslations("navbar")
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const isDarkTheme = globalThis.matchMedia("(prefers-color-scheme: dark)").matches

    setTheme(isDarkTheme ? "dark" : "light")
  }, [])

  return (
    <Button
      data-testid="theme-toggle-button"
      variant="link"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
      }}
    >
      <SunIcon data-testid="theme-toggle-sun-icon" className="dark:hidden h-6 w-6" />
      <MoonIcon data-testid="theme-toggle-moon-icon" className="hidden dark:block bg-inherit h-6 w-6" />
      <span data-testid="theme-toggle-sr-text" className="sr-only">
        {t("toggleTheme")}
      </span>
    </Button>
  )
}
