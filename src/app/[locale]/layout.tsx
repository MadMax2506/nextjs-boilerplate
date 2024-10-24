import { routing } from "@i18n"
import "@styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

type ParamProps = { locale: "de" | "en" }
type RootLayoutProps = { children: React.ReactNode } & { params: ParamProps }

export async function generateMetadata({ params }: { params: ParamProps }) {
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

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { locale } = await params // asynchronous access of `params`

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) notFound()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${GeistSans.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
