import { useTranslations } from "next-intl"

export default function HomePage() {
  const t = useTranslations()

  return <div className="w-full h-full flex items-center justify-center">{t("title")}</div>
}
