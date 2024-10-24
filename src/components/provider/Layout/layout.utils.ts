import { Page } from "@components/NavbarSC"
import { getTranslations } from "next-intl/server"

export const getPages = async (): Promise<Page[]> => {
  const t = await getTranslations("navbar.pages")

  return [
    { href: "/", label: t("home") },
    { href: "/admin", label: t("admin") },
  ]
}
