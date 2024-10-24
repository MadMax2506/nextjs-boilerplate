import { Locale, routing } from "@i18n"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

type LocaleProviderSCProps = { children: React.ReactNode; locale: Locale }

export const LocaleProviderSC = async ({ children, locale }: LocaleProviderSCProps) => {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) notFound()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
