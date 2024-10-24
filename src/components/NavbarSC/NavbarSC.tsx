import { Link } from "@i18n"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { HamburgerNavSC } from "./HamburgerNavSC"
import { LocaleSwitchCC } from "./LocaleSwitchCC"
import { NavLinksSC } from "./NavLinksSC"
import { ThemeSwitchCC } from "./ThemeSwitchCC"
import { Page } from "./navbar.types"

type NavbarSCProps = { children?: React.ReactNode; pages?: Page[] }

export const NavbarSC = async ({ children, pages }: NavbarSCProps) => {
  const t = await getTranslations("navbar")

  return (
    <header className="shadow-lg border-b sticky top-0">
      <div className="h-10 bg-secondary px-6">
        <div className="h-full flex justify-between items-center mx-auto max-w-7xl">
          <Link href="https://max-janorschke.de" target="_blank">
            {t("toWebsite")}
          </Link>
          <div className="flex justify-between gap-10 items-center">
            <LocaleSwitchCC />

            <ThemeSwitchCC />

            {/* TODO: Implement Login */}
            <div>Login</div>
          </div>
        </div>
      </div>

      <div className="h-24 px-6">
        <div className="h-full flex justify-between items-center mx-auto max-w-7xl">
          <HamburgerNavSC className="block lg:hidden" pages={pages} />

          <Link href="/">
            <Image src="/logo.png" alt="MadMax Logo" className="h-full" width={80} height={100} />
          </Link>

          <NavLinksSC className="hidden lg:block" pages={pages} />
          <div className="flex-shrink-0">{children}</div>
        </div>
      </div>
    </header>
  )
}
