import { Locale, routing } from "@i18n"
import { FullPageLayout } from "@provider/Layout"
import { LocaleProviderSC } from "@provider/LocaleProviderSC"
import { ThemeProviderSC } from "@provider/ThemeProviderSC"
import "@styles/globals.css"
import { GeistSans } from "geist/font/sans"

import { getTranslations, setRequestLocale } from "next-intl/server"

type GenerateMetadataProps = { params: { locale: Locale } }

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const { locale } = await params // asynchronous access of `params`

  const t = await getTranslations({ locale })

  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type RootLayoutProps = { children: React.ReactNode; params: { locale: Locale } }

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { locale } = await params // asynchronous access of `params`

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${GeistSans.variable}`}>
      <body>
        <LocaleProviderSC locale={locale}>
          <ThemeProviderSC attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <FullPageLayout>{children}</FullPageLayout>
          </ThemeProviderSC>
        </LocaleProviderSC>
      </body>
    </html>
  )
}
